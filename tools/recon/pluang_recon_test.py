import os
import json
import time
import pytest
from seleniumbase import BaseCase

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, ".recon")
SCREENS_DIR = os.path.join(OUTPUT_DIR, "screens")
OBS_DIR = os.path.join(BASE_DIR, "docs", "reference")
PLUG_URL = "https://pluang.com/"

VIEWPORTS = {
    "mobile": {"width": 375, "height": 812},
    "tablet": {"width": 768, "height": 1024},
    "desktop": {"width": 1440, "height": 900},
}

class PluangReconTest(BaseCase):
    def setUp(self):
        super().setUp()
        self.headless = True

    def _set_viewport(self, name):
        config = VIEWPORTS[name]
        self.driver.execute_cdp_cmd(
            "Emulation.setDeviceMetricsOverride",
            {
                "width": config["width"],
                "height": config["height"],
                "deviceScaleFactor": 2 if config["width"] < 700 else 1,
                "mobile": config["width"] < 700,
                "scale": 1,
            },
        )
        time.sleep(0.5)

    def _goto(self, path):
        self.get(PLUG_URL + path.lstrip("/"))
        time.sleep(1.6)

    def _screenshot(self, path):
        self.save_screenshot(path)

    def _analyze_page(self, path, viewport_name):
        self._goto(path)
        full_path = os.path.join(SCREENS_DIR, f"{viewport_name}{path.replace('/', '_')}_full.png")
        self._screenshot(full_path)

        sections = self.driver.execute_script("""
            const els = document.querySelectorAll('section, header, footer, article, .hero, .feature-card, .card');
            return Array.from(els).map(el => {
                const rect = el.getBoundingClientRect();
                return {
                    tagName: el.tagName.toLowerCase(),
                    className: el.className,
                    id: el.id,
                    textContent: (el.textContent || '').slice(0, 120),
                    boundingClientRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                    offsetParent: el.offsetParent ? el.offsetParent.tagName : null,
                };
            });
        """)

        section_types = []
        for s in sections:
            cls = s["className"] or ""
            tag = s["tagName"]
            if "nav" in cls or tag == "nav":
                stype = "navigation"
            elif "hero" in cls or tag == "header":
                stype = "hero"
            elif "feature" in cls or "card" in cls:
                stype = "card"
            elif "footer" in cls or tag == "footer":
                stype = "footer"
            elif "faq" in cls:
                stype = "accordion"
            elif "carousel" in cls:
                stype = "carousel"
            elif "modal" in cls or "popup" in cls:
                stype = "modal"
            elif tag in ("section", "article"):
                stype = "section"
            else:
                stype = "other"
            section_types.append(stype)

        cta_count = self.driver.execute_script("""
            const elements = document.querySelectorAll('a, button');
            let count = 0;
            for (const el of elements) {
                const text = el.textContent.trim().toLowerCase();
                if (text.includes('daftar') || text.includes('coba') || text.includes('mulai') || text.includes('simulasi') || text.includes('pelajari')) {
                    count++;
                }
            }
            return count;
        """)

        scroll_detected = self.driver.execute_script("return window.onscroll !== undefined || 'IntersectionObserver' in window;")

        sticky_count = self.driver.execute_script("""
            let count = 0;
            const els = document.querySelectorAll('*');
            for (const el of els) {
                const style = window.getComputedStyle(el);
                if (style.position === 'sticky' || style.position === 'fixed') {
                    count++;
                }
            }
            return count;
        """)

        font_sizes = self.driver.execute_script("""
            const map = {};
            const elements = document.querySelectorAll('h1, h2, h3, h4, p');
            for (const el of elements) {
                const tag = el.tagName.toLowerCase();
                const size = window.getComputedStyle(el).fontSize;
                map[tag] = size;
            }
            return map;
        """)

        return {
            url_path: path,
            viewport: viewport_name,
            screenshot_full: os.path.basename(full_path),
            sections: sections,
            section_types: section_types,
            cta_count: cta_count,
            scroll_detected: scroll_detected,
            sticky_count: sticky_count,
            font_sizes: font_sizes,
        }

    def test_pluang_recon(self):
        os.makedirs(SCREENS_DIR, exist_ok=True)
        os.makedirs(OBS_DIR, exist_ok=True)

        all_data = []
        for vp_name in VIEWPORTS:
            self._set_viewport(vp_name)
            for path in ["", "/produk", "/harga", "/edukasi", "/tentang"]:
                try:
                    page_data = self._analyze_page(path, vp_name)
                    all_data.append(page_data)
                except Exception as e:
                    print(f"Failed to analyze {path} on {vp_name}: {e}")

        raw_path = os.path.join(OBS_DIR, "pluang_raw.json")
        with open(raw_path, "w", encoding="utf-8") as f:
            json.dump(all_data, f, indent=2)

        md_lines = [
            "# Pluang Design Observations",
            "",
            "## Sitemap",
            "| Page | Sections | CTA Count | Sticky Elements |",
            "|------|----------|-----------|----------------|",
        ]
        for page in all_data:
            md_lines.append(f"| {page['url_path']} | {len(set(page['section_types']))} | {page['cta_count']} | {page['sticky_count']} |")

        md_path = os.path.join(OBS_DIR, "pluang-observations.md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write("\n".join(md_lines))

        print(f"Recon complete. Raw data: {raw_path}")
        print(f"Markdown: {md_path}")
        print(f"Screenshots saved to: {SCREENS_DIR}")

if __name__ == "__main__":
    # This allows running the file directly with python
    # But normally we rely on pytest to execute the tests
    pytest.main([__file__, "-v"])

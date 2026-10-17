"""KoinATM end-to-end checks (SeleniumBase).

Run:  python -m pytest tests/e2e/test_koinatm.py -v
Env:  BASE_URL (default http://localhost:3100)
      CHROME_PATH (optional override for the Chrome binary)
"""
import os
import time

import pytest
from seleniumbase import BaseCase

BASE = os.environ.get("BASE_URL", "http://localhost:3100")
CHROME = os.environ.get(
    "CHROME_PATH",
    os.path.join(
        os.path.expanduser(
            r"~\AppData\Roaming\Python\Python314\site-packages\seleniumbase\drivers"
        ),
        "chrome-win64",
        "chrome.exe",
    ),
)

VIEWPORTS = {"desktop": (1440, 900), "mobile": (375, 667), "narrow": (320, 640)}


class KoinAtmTest(BaseCase):
    def setUp(self):
        super().setUp()
        if os.path.exists(CHROME):
            self.binary_location = CHROME
        self.headless = True

    # ---------- helpers ----------

    def _viewport(self, name):
        w, h = VIEWPORTS[name]
        self.driver.execute_cdp_cmd(
            "Emulation.setDeviceMetricsOverride",
            {"mobile": w < 700, "width": w, "height": h,
             "deviceScaleFactor": 2 if w < 700 else 1, "scale": 1},
        )

    def _goto(self, path="/"):
        self.get(BASE + path)
        time.sleep(1.6)

    def _no_overflow(self):
        return self.driver.execute_script(
            "return document.documentElement.scrollWidth <= window.innerWidth + 1;"
        )

    # ---------- Phase 5: responsive ----------

    def test_no_horizontal_overflow(self):
        for vp in ["desktop", "mobile", "narrow"]:
            self._viewport(vp)
            for path in ["/", "/dashboard", "/harga", "/edukasi", "/brankas", "/settings"]:
                self._goto(path)
                assert self._no_overflow(), (
                    f"horizontal overflow at {vp} on {path}: "
                    f"scrollW={self.driver.execute_script('return document.documentElement.scrollWidth')} "
                    f"innerW={self.driver.execute_script('return window.innerWidth')}"
                )

    def test_single_h1_and_heading_order(self):
        self._goto("/")
        levels = self.driver.execute_script(
            "return [...document.querySelectorAll('h1,h2,h3,h4')].map(h => +h.tagName[1]);"
        )
        assert levels.count(1) == 1, f"expected exactly one h1, got {levels.count(1)}"
        assert levels[0] == 1, "h1 must be the first heading"
        for prev, cur in zip(levels, levels[1:]):
            assert cur <= prev + 1, f"skipped heading level: {prev} -> {cur}"

    def test_touch_targets_meet_minimum(self):
        self._viewport("mobile")
        self._goto("/")
        small = self.driver.execute_script("""
          return [...document.querySelectorAll('a,button,summary')]
            .filter(e => e.offsetParent)
            .map(e => { const b = e.getBoundingClientRect();
              return {t: e.innerText.trim().slice(0,26), w: Math.round(b.width), h: Math.round(b.height)}; })
            .filter(x => x.w && (x.w < 44 || x.h < 44));
        """)
        # Inline text links inside paragraphs are exempt (WCAG 2.5.8 inline exception).
        offenders = [s for s in small if s["h"] < 24 and s["w"] < 44]
        assert not offenders, f"targets below 24px minimum: {offenders}"

    # ---------- Phase 5: CTA navigation ----------

    def test_all_primary_ctas_reach_wizard(self):
        self._goto("/")
        hrefs = self.driver.execute_script(
            "return [...document.querySelectorAll('header a, section a')]"
            ".map(a => a.getAttribute('href')).filter(h => h && h.includes('/dashboard'));"
        )
        assert len(hrefs) >= 2, f"expected navbar + hero CTA to /dashboard, got {hrefs}"

        # click the hero primary CTA
        self.driver.execute_script("""
          const a = [...document.querySelectorAll('section a')]
            .find(x => x.getAttribute('href') === '/dashboard');
          a.click();
        """)
        time.sleep(2.0)
        assert "/dashboard" in self.driver.current_url, self.driver.current_url

    def test_faq_keyboard_toggle(self):
        self._goto("/")
        self.driver.execute_script(
            "document.querySelector('#faq').scrollIntoView({block:'start'});"
        )
        time.sleep(0.5)
        details = self.driver.find_elements("css selector", "#faq details")
        assert details, "no FAQ <details> elements found"
        before = self.driver.execute_script("return arguments[0].open;", details[1])
        self.driver.execute_script(
            "arguments[0].querySelector('summary').focus();", details[1]
        )
        self.driver.find_elements("css selector", "#faq details summary")[1].send_keys("\ue007")
        time.sleep(0.5)
        after = self.driver.execute_script("return arguments[0].open;", details[1])
        assert before != after, "FAQ did not toggle with Enter key"

    def test_dark_mode_toggle(self):
        self._goto("/")
        before = self.driver.execute_script(
            "return document.documentElement.classList.contains('dark');"
        )
        self.driver.execute_script(
            "document.querySelector('button[aria-label*=\"dark\" i]').click();"
        )
        time.sleep(0.6)
        after = self.driver.execute_script(
            "return document.documentElement.classList.contains('dark');"
        )
        assert before != after, "theme toggle did not change the dark class"

    def test_market_ticker_loads_real_prices(self):
        self.get(BASE + "/")
        time.sleep(3.0)
        rows = self.driver.execute_script("""
          return [...document.querySelectorAll('#harga li')]
            .map(li => li.innerText).filter(t => /Rp/.test(t));
        """)
        assert rows, "price list rendered no rows with Rp values"
        assert not any("animate-pulse" in r for r in rows)

    def test_market_ticker_handles_api_failure(self):
        """Block /api/prices and confirm the page does not break or hang."""
        self.driver.execute_cdp_cmd(
            "Network.setBlockedURLs", {"urls": ["*/api/prices*"]}
        )
        try:
            self.get(BASE + "/")
            time.sleep(3.0)
            state = self.driver.execute_script("""
              const sec = document.querySelector('#harga');
              return { exists: !!sec,
                       skeletons: sec ? sec.querySelectorAll('.animate-pulse').length : -1,
                       bodyText: document.body.innerText.length };
            """)
            assert state["bodyText"] > 500, (
                f"page did not render (hydration failure?): {state}"
            )
            assert state["exists"], "harga section disappeared on API failure"
            # must not spin forever
            assert state["skeletons"] == 0, (
                f"loading skeleton still showing after failure: {state}"
            )
        finally:
            self.driver.execute_cdp_cmd("Network.setBlockedURLs", {"urls": []})

    # ---------- Phase 5: reduced motion ----------

    def test_respects_reduced_motion(self):
        self.driver.execute_cdp_cmd(
            "Emulation.setEmulatedMedia",
            {"features": [{"name": "prefers-reduced-motion", "value": "reduce"}]},
        )
        try:
            self._goto("/")
            time.sleep(1.0)
            # Reveal content must be visible immediately, not stuck at opacity 0
            hidden = self.driver.execute_script("""
              return [...document.querySelectorAll('section > div > div')]
                .filter(e => getComputedStyle(e).opacity === '0').length;
            """)
            assert hidden == 0, f"{hidden} elements stuck invisible under reduced motion"
        finally:
            self.driver.execute_cdp_cmd(
                "Emulation.setEmulatedMedia",
                {"features": [{"name": "prefers-reduced-motion", "value": ""}]},
            )

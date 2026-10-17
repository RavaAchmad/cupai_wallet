# KoinATM Landing Page Redesign

## Context

KoinATM is a Next.js 14 (App Router) + Tailwind + shadcn/ui crypto-ATM product. The **core app is finished and verified** (dashboard, 5-step ATM wizard, mock APIs, `/harga`, `/edukasi`, `/brankas`, `/settings` — build green, Lighthouse a11y 100). This plan touches **only the marketing landing page** (`src/app/page.tsx` + its section components) and does not alter the product UI.

The landing page currently reads as a wireframe: a 300×560 phone frame containing a `₿` text glyph and a 🏧 emoji, a hero badge claiming "Terdaftar & Diawasi Bappebti", four identical trust cards, and a footer of `href="#"` links. The brief asks for Pluang-grade polish with an own identity and no unverifiable claims.

**Reference-site access: FAILED.** `https://pluang.com/` returned `403` (bot-blocked) when fetched. No inspection of live Pluang was possible. The plan below is grounded in the brief's own guidance plus fintech design principles, not in observed Pluang markup. Do not claim Pluang was reviewed.

### Decisions locked with the user

1. **Trust claims → reframe as educational.** Remove every Bappebti/licensing/encryption/"ribuan pengguna" claim. There is no backend, no legal entity, and nothing in the repo substantiates them. Replace with honest mechanism explanation + an explicit simulation disclaimer.
2. **Accent color → keep blue, strengthen it.** `--primary: 221.2 83.2% 53.3%` stays. The whole app is built on it and passes a11y 100. No token migration.
3. **Hero visual → static render of the real ATM screen; CTAs link to `/dashboard`.** No emoji, no fake phone chrome. The working wizard already lives at `/dashboard`, so the hero depicts it rather than duplicating it.

## Files in scope

| File | Action |
|---|---|
| `src/app/page.tsx` | Rewrite: hero, trust, CTA, footer, section composition |
| `src/components/how-it-works.tsx` | Rewrite: replace emoji with lucide icons, 4 steps, fix copy |
| `src/components/market-ticker.tsx` | Rewrite: drop hardcoded price strings, fetch `/api/prices` |
| `src/components/atm-hero-visual.tsx` | **New** — static HTML/CSS ATM screen mock |
| `src/components/faq.tsx` | **New** — accessible accordion |
| `src/app/globals.css` | Additive only: refined shadow/radius tokens if needed |

**Out of scope (do not touch):** `src/app/dashboard/*`, `src/components/atm-wizard.tsx`, `src/lib/*`, all `/api/*`, `src/components/ui/*`, `src/lib/store.ts`, `src/app/harga|edukasi|brankas|settings`. Routes, mock APIs, and the wizard must remain byte-compatible in behavior.

## Known defects to fix

- `market-ticker.tsx:9-14` — prices are hardcoded strings (`"Rp 1.052.400.000"`) that **disagree** with `/api/prices` (`BTC` = 650000000). Two sources of truth. Fetch the API instead.
- `how-it-works.tsx:11,15,21` — emoji `👤 💰 ₿` used as illustration; `₿` is an inconsistent Unicode glyph. Brief forbids emoji as product visuals.
- `how-it-works.tsx:10` — copy claims "verifikasi ID… 2 menit" and `:15` "Masukkan uang tunai ke ATM KoinATM" — describes a physical ATM network that does not exist. Must be reworded to describe the *simulation*.
- `page.tsx:55` — "Masuk ATM" button has no handler. Either wire it or remove it.
- `page.tsx:81` — "Lihat Simulasi ATM" has no handler (it is not an `<a>`).
- `page.tsx:177-245` — nine `href="#"` links. Brief forbids non-functional buttons/links.
- `page.tsx:66` — hero badge "Terdaftar & Diawasi Bappebti" — unverifiable claim.
- `page.tsx:11,12,26,27` — trust cards with unverifiable claims.
- `how-it-works.tsx:38-45` — `motion.div` fade-and-slide-up on every card, flagged by the design skill as a generic AI tell.

## Implementation plan

### Task 1 — Design tokens (subtle, additive)
In `globals.css`, keep all existing tokens. Only add if needed:
- A shadow scale that is softer/less uniform than the default `shadow-lg` (avoid the "same soft grey shadow on every card" tell).
- Keep `--radius: 0.75rem`. Use **two** radii deliberately: `rounded-2xl` for large surfaces, `rounded-lg` for controls — not one radius everywhere.

Do **not** add gradients as decoration. One gradient is permitted only in the hero backdrop, if it earns its place.

### Task 2 — `src/components/atm-hero-visual.tsx` (new)
A **static, non-interactive** HTML/CSS depiction of the real ATM screen. Pure presentational, no `"use client"` needed.

Must reflect what actually exists in the product so it is not a lie:
- Top: "Selamat Datang" + a balance in `text-3xl` with an eye icon (the real dashboard has this).
- Middle: a **2×2 grid of four large labeled tiles** — Setor, Tarik, Tukar, Kirim — using lucide icons (`ArrowUpRight`, `DollarSign`, `RefreshCw`, `Send`) exactly as `page.tsx` action buttons do.
- Bottom: a muted strip showing a partial nav (Beranda, Edukasi, Brankas, Profil).

Constraints:
- Wrap in `aria-hidden="true"` and give the containing `<Reveal>` a proper accessible label or a visually-hidden description — it is decorative because the real thing is one click away.
- No emoji, no Unicode currency glyphs, no external images.
- Must not overflow at 375px.

### Task 3 — Rewrite the hero (`page.tsx` sections 1–2)
- **Navbar:** logo mark (a `<div>` with "K" in `bg-primary/10`, as today — acceptable since it is a styled container, not an emoji) + wordmark. Nav items: Fitur, Cara Kerja, Edukasi, Harga. Keep `ThemeToggle`. Replace "Masuk ATM" with a real link to `/dashboard` labeled "Coba Simulasi" (there is no auth, so "Masuk" would be a dead end).
- **Headline:** short and concrete. Suggested: "Crypto, Lebih Mudah Dipahami." / description: "Kenali cara kerja crypto ATM lewat simulasi yang sederhana dan transparan — tanpa uang sungguhan." Adjust to the brief's tone but keep honesty.
- **Primary CTA:** "Coba Simulasi ATM" → `<Link href="/dashboard">` (the working wizard). **Secondary CTA:** "Pelajari Cara Kerjanya" → anchor to `#cara-kerja`.
- **Remove** the "Terdaftar & Diawasi Bappebti" badge. Replace with a neutral, true statement, e.g. "Simulasi edukasi — tanpa uang sungguhan."
- **Balance the grid:** `lg:grid-cols-[1.1fr_1fr]`, `items-center`, generous vertical rhythm. Eliminate the current `min-h-[70vh]` + `justify-center` combination that produces the empty top/bottom band.
- Hero must fit a 1440×900 viewport without the visual being clipped.

### Task 4 — Rewrite `how-it-works.tsx`
- Replace emoji with lucide icons (`UserPlus`, `Wallet`, `ArrowLeftRight`, `ShieldCheck`) in a consistent `h-12 w-12 rounded-xl bg-primary/10 text-primary` container.
- Four steps describing the **simulation flow** only: Buat profil demo → Lihat saldo → Pilih transaksi → Terima struk digital. Do not describe ID verification, cash deposit, or real settlement.
- Vary the layout so it is not a 4-up row of identical cards: a horizontal stepped layout on desktop (connected by a rule, which honestly encodes sequence), stacked on mobile. Numbered markers **are** justified here because it is genuinely a sequence.
- Replace `motion.div` per-card entrance with the existing `<Reveal>` wrapper, or drop animation entirely. Respect `useReducedMotion` (the `Reveal` component already does).

### Task 5 — Rewrite `market-ticker.tsx` to use the API
- Add `"use client"` + `useEffect` fetch of `/api/prices` (mirror the pattern in `dashboard/page.tsx:59-77`).
- Render up to 5 assets with `formatRupiah` from `@/lib/atm-data` — **single source of truth**; delete the hardcoded `assets` array.
- Reuse the existing `Skeleton` for the loading state.
- Keep the horizontal snap-scroll on mobile / grid on desktop.
- Change the caption "Diperbarui setiap menit" — the data is a static mock with random jitter, so state plainly: "Harga contoh untuk simulasi."

### Task 6 — New trust/transparency section (replaces Bappebti cards)
Four cards, each stating something **verifiable against the repo**:
1. Cara kerja transparan — mirrors the 5 wizard steps.
2. Biaya simulasi ditampilkan di depan — the wizard literally shows `Biaya jaringan` before PIN.
3. Tanpa uang sungguhan — links to the disclaimer.
4. Bisa dipakai semua umur — the app has Mode Lansia + large targets.

Use varied visual weight (one wider feature card + three smaller), not four identical boxes. Each card gets one lucide icon. No shield/lock/certification imagery that implies security guarantees.

### Task 7 — New `faq.tsx` (accessible accordion)
- Use shadcn/ui primitives. **Note:** there is no `accordion.tsx` in `src/components/ui/`. Prefer implementing with the existing `@radix-ui/react-*` deps — either add `accordion.tsx` following the project's shadcn pattern, or use plain `<details>/<summary>`. **Do not add a new npm dependency** (brief forbids it); `<details>` is the lower-risk choice and is keyboard-accessible by default.
- Questions must be answerable from the code: "Apakah ini uang sungguhan?", "Di mana datanya disimpan?", "Apakah perlu daftar?", "Apa itu Mode Lansia?".
- Answers must be honest: state clearly that balances/prices are mock data and no real transaction occurs.

### Task 8 — Footer + CTA section
- Replace all nine `href="#"` with real targets: existing routes (`/dashboard`, `/edukasi`, `/harga`, `/brankas`, `/settings`) and in-page anchors. If a page does not exist (no `/syarat`, no `/privasi`, no `/bantuan`), **omit the link** rather than shipping a dead one.
- Footer year: compute or state plainly; the current "2024 KoinATM" is not dynamic.
- Final CTA section: single strong CTA to `/dashboard`, remove the vague "Lihat Fitur" secondary or point it to `#keamanan`.

## Verification (must actually be run)

Implementation agent should use the project's real commands. Note PowerShell 5.1: chain with `;`, never `&&`.

1. `npm run build` — must be exit 0 with zero ESLint/TS errors. Redirect to a file and read it; prior runs swallowed stdout.
2. `npm start`, then confirm `/` returns 200 and `/dashboard`, `/edukasi`, `/harga`, `/brankas`, `/settings` still return 200 (**regression check** — the brief requires preserving working features).
3. Lighthouse at 375px against `/` for `accessibility,best-practices` — target a11y ≥ 95, and **zero** `label-content-name-mismatch` / `link-name` / `color-contrast` failures. Edge is at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`; set `$env:CHROME_PATH`.
4. Headless browser pass (puppeteer-core against Edge, `--no-sandbox`) at 375px and 1440px: assert hero CTAs navigate to `/dashboard`, `#cara-kerja` anchor scrolls, FAQ toggles via keyboard, theme toggle flips `document.documentElement.classList`, and **no console errors** on `/`.
5. Check `document.documentElement.scrollWidth <= innerWidth` at 375px to prove no horizontal overflow.
6. Grep the built output for leftover `href="#"` and for the strings `Bappebti`, `256-bit`, `kelas militer`, `ribuan` to confirm claims are gone.

## Risks and constraints

- **Cannot verify Pluang.** Reference fetch returned 403. Do not assert it was reviewed. Design from principles.
- **Preserve product UI.** The wizard/dashboard are verified-good; any change there risks regressing a11y 100 and the E2E flow. Keep the diff to landing-page files.
- **No new dependencies.** `framer-motion`, `lucide-react`, `@radix-ui/*` are available. Adding an accordion lib is not authorized.
- **No real financial claims.** Every string must be checkable against the repo. Mock data must be labeled as such.
- **`/dashboard` has no auth.** "Coba Simulasi" links straight in; that is intentional — do not build a fake login gate.
- **Landing page is currently a Server Component** (`page.tsx` has no `"use client"`). `market-ticker.tsx` and `theme-toggle.tsx` are already client components, so composition is fine. Do not convert `page.tsx` to a client component without cause.

## Definition of done

- [ ] No unverifiable claims anywhere on `/` (grep confirms `Bappebti`/`256-bit`/`ribuan` absent)
- [ ] No emoji used as illustration; no fake phone chrome
- [ ] Hero has balanced composition at 1440×900 and 375px, no clipping
- [ ] Both hero CTAs work; all footer links resolve to real routes or are removed
- [ ] Market data comes from `/api/prices` via `formatRupiah`; no hardcoded prices
- [ ] FAQ works with keyboard alone
- [ ] `npm run build` exit 0
- [ ] All six app routes still return 200
- [ ] Lighthouse a11y ≥ 95, zero console errors, no horizontal overflow at 375px

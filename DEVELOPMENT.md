# LOTUS.css: Development Guide

This document describes how the source is organized, how it is compiled, the
design-token system, the JS enhancement layer, how the docs site is built, and
how releases get from your machine to npm and the web.

---

## 1. Toolchain

Everything runs on Node.js, no Ruby, no Jekyll.

| Tool                 | What it does                                                    |
| -------------------- | --------------------------------------------------------------- |
| **Dart Sass**        | Compiles `scss/` → readable `dist/lotus.css`                    |
| **Lightning CSS**    | Minifies + vendor-prefixes → `dist/lotus.min.css`               |
| **esbuild**          | Bundles `js/` (TypeScript) → `dist/lotus.js` + `lotus.min.js`   |
| **Vite**             | Docs site dev server, HMR, and production build                 |
| **Stylelint**        | Lints `scss/**` and `docs/css/**` (config: `.stylelintrc.json`) |
| **TypeScript (tsc)** | Typechecks the `js/` sources (`npm run typecheck`)              |
| **Vitest**          | Runs the JS unit tests in jsdom (`npm test`)                    |
| **highlight.js**     | Syntax highlighting on the docs site (docs-only dep)            |

**Prerequisites:** Node.js ≥ 18 and npm. Install everything once with `npm
install`.

---

## 2. Repository layout

```
├── scss/                     # The framework CSS source (Sass modules)
│   ├── lotus.scss            #   entry point (compile this)
│   ├── lotus-theme.scss      #   defines the partial load order
│   └── _*.scss               #   partials (normalize, base, form, sheet, …)
├── js/                       # The optional JS layer (TypeScript source)
│   ├── index.ts              #   entry: init() wires up every module
│   ├── types.d.ts            #   hand-written public type declarations
│   └── *.ts                  #   modules (theme, toast, dialog, tabs, …)
├── tests/                    # Unit tests for the JS layer (Vitest + jsdom)
│   └── *.test.ts             #   one spec file per module
├── docs/                     # Docs site (Vite)
│   ├── index.html            #   landing page
│   ├── demo.html             #   component demo
│   ├── partials/             #   shared page shell (head, nav, footer)
│   ├── public/               #   static assets (logo.svg, logo.png, favicon)
│   ├── css/site.scss         #   bundles the framework + site styles
│   └── js/
│       ├── main.js           #   registers highlight.js, imports js/, init()
│       └── samples.js        #   single source of truth for code samples
├── dist/                     # Committed build output (never hand-edited)
│   ├── lotus.css             #   expanded, readable
│   ├── lotus.min.css         #   minified + prefixed
│   ├── lotus.js              #   ESM bundle of the JS layer
│   ├── lotus.min.js          #   minified IIFE (script-tag `lotus` global)
│   └── lotus.d.ts            #   type declarations
├── scripts/
│   ├── build.mjs             # Sass → Lightning CSS pipeline (--watch supported)
│   ├── build-js.mjs          # esbuild → lotus.js + lotus.min.js (--watch supported)
│   ├── html-partials.mjs     # Vite plugin: inlines docs/partials/*.html
│   ├── favicons.mjs          # sharp: logo.svg → full favicon/app-icon set + webmanifest
│   ├── social-card.mjs       # headless Chrome: renders the 1200×630 og-image.png
│   └── clean.mjs             # empties dist/
├── .github/workflows/
│   ├── ci.yml                # lint + typecheck + build + verify dist on every push/PR
│   ├── pages.yml             # builds + deploys the docs to GitHub Pages
│   └── release.yml           # publishes to npm on a version tag
├── vite.config.js            # docs site config (multi-page, relative base, partials)
├── vitest.config.ts          # test runner config (jsdom environment)
├── tsconfig.json             # typecheck config for js/ + tests/
└── .stylelintrc.json         # linting rules
```

---

## 3. Everyday commands

| Command              | What it does                                                 |
| -------------------- | ------------------------------------------------------------ |
| `npm run dev`        | Start the docs dev server with HMR (http://localhost:5173)   |
| `npm run watch`      | Rebuild CSS `dist/` automatically when `scss/` changes       |
| `npm run watch:js`   | Rebuild `dist/lotus.js` automatically when `js/` changes     |
| `npm run build:css`  | Compile `dist/lotus.css` + `dist/lotus.min.css` once         |
| `npm run build:js`   | Bundle `dist/lotus.js` + `dist/lotus.min.js` + `.d.ts`       |
| `npm run build:dist` | `build:css` + `build:js` (everything shipped in the package) |
| `npm run build:docs` | Production build of the docs site into `docs-dist/`          |
| `npm run build`      | `clean` → `build:dist` → `build:docs` (the full build)       |
| `npm run lint`       | Stylelint over all Sass sources                              |
| `npm run typecheck`  | `tsc --noEmit` over the `js/` sources                        |
| `npm test`           | Vitest unit tests for the JS layer (`tests/*.test.ts`)       |
| `npm run preview`    | Preview the built docs site locally                          |

### Typical editing loop

```bash
npm run dev        # open http://localhost:5173, tweak docs/css/site.scss → HMR
npm run watch      # while editing scss/, keep dist/ in sync in a second terminal
npm run lint       # before committing, must be clean
npm run build:css  # regenerate dist/ if you changed scss/
```

> **Always commit the regenerated `dist/`** when you change `scss/`. CI refuses
> to merge if `dist/` is out of date (see §6).

---

## 4. How the build works

`npm run build:css` runs `scripts/build.mjs`:

1. **Dart Sass** compiles `scss/lotus.scss` in `expanded` style.
2. A version banner (read from `package.json`) is prepended.
3. **Lightning CSS** minifies the result and adds vendor prefixes for the
   browsers in the `browserslist` field of `package.json`.
4. Outputs:
   - `dist/lotus.css`: readable, for development/debugging
   - `dist/lotus.min.css`: production, for CDNs and package consumers

Both files carry a `/*!` version banner. The minified file is additionally
vendor-prefixed (e.g. `-webkit-`) per the `browserslist` field, while
`dist/lotus.css` is left as-is for readability. Use the minified file for
production. (The source already hand-writes the prefixes it needs.)

### Adding a new partial

1. Create `scss/_mything.scss`.
2. Add `@use 'mything';` to `scss/lotus-theme.scss` where you want its CSS to
   be emitted. Modules can `@use` one another to share `@mixin`/`@function`/
   variables; each module's CSS is emitted exactly once.
3. Run `npm run lint` and `npm run build:css`, then commit the partial **and**
   the updated `dist/`.

---

## 5. Design tokens

Every visual decision in LOTUS.css is a CSS custom property defined in
`scss/_base.scss`. There are **two palettes**: light (the `:root` defaults)
and dark (the `@mixin dark-tokens()` block, applied by the `.dark` class and
by `@media (prefers-color-scheme: dark)`), plus a shared set of shape, motion
and layout tokens that stay constant across themes.

### 5.1 Color roles

| Token                                | Light                       | Dark                        | Purpose             |
| ------------------------------------ | --------------------------- | --------------------------- | ------------------- |
| `--background`                       | `oklch(100% 0 0)`           | `oklch(14.5% 0 0)`          | Page background     |
| `--foreground`                       | `oklch(14.5% 0 0)`          | `oklch(98.5% 0 0)`          | Default text        |
| `--card`                             | `oklch(100% 0 0)`           | `oklch(20.5% 0 0)`          | Card / surface bg   |
| `--card-foreground`                  | `oklch(14.5% 0 0)`          | `oklch(98.5% 0 0)`          | Text on cards       |
| `--popover` / `--popover-foreground` | like `--card`               | like `--card`               | Floating surfaces   |
| `--primary`                          | `oklch(20.5% 0 0)`          | `oklch(92.2% 0 0)`          | Brand / emphasis    |
| `--primary-foreground`               | `oklch(98.5% 0 0)`          | `oklch(20.5% 0 0)`          | Text on primary     |
| `--secondary`                        | `oklch(97% 0 0)`            | `oklch(26.9% 0 0)`          | Subtle surfaces     |
| `--secondary-foreground`             | `oklch(20.5% 0 0)`          | `oklch(98.5% 0 0)`          | Text on secondary   |
| `--muted`                            | `oklch(97% 0 0)`            | `oklch(26.9% 0 0)`          | Muted surfaces      |
| `--muted-foreground`                 | `oklch(55.6% 0 0)`          | `oklch(70.8% 0 0)`          | Secondary text      |
| `--accent`                           | `oklch(97% 0 0)`            | `oklch(37.1% 0 0)`          | Hover/active fills  |
| `--accent-foreground`                | `oklch(20.5% 0 0)`          | `oklch(98.5% 0 0)`          | Text on accent      |
| `--destructive`                      | `oklch(57.7% 0.245 27.325)` | `oklch(70.4% 0.191 22.216)` | Errors / danger     |
| `--destructive-foreground`           | `oklch(98.5% 0 0)`          | `oklch(98.5% 0 0)`          | Text on destructive |
| `--success`                          | `oklch(69.6% 0.17 162.48)`  | `oklch(69.6% 0.17 162.48)`  | Positive states     |
| `--warning`                          | `oklch(82.8% 0.189 84.429)` | `oklch(82.8% 0.189 84.429)` | Warning states      |
| `--border`                           | `oklch(92.2% 0 0)`          | `oklch(100% 0 0 / 10%)`     | Hairlines           |
| `--input`                            | `oklch(92.2% 0 0)`          | `oklch(100% 0 0 / 15%)`     | Input borders       |
| `--ring`                             | `oklch(70.8% 0 0)`          | `oklch(55.6% 0 0)`          | Focus rings         |

### 5.2 Syntax tokens

Code blocks are themed through `--syntax-*` tokens instead of hardcoded
backgrounds. This is what keeps code blocks readable in dark mode (the old
`body.dark`-scoped overrides never matched, because the theme class lives on
`<html>`). All tokens are consumed by `scss/_syntax.scss`, which maps both
highlight.js classes (`.hljs-keyword`, …) and legacy pygments classes
(`.highlight .k`, …).

| Token               | Light                 | Dark                  | Used by                   |
| ------------------- | --------------------- | --------------------- | ------------------------- |
| `--syntax-bg`       | `oklch(98.5% 0 0)`    | `oklch(20.5% 0 0)`    | `pre` background          |
| `--syntax-fg`       | `oklch(20.5% 0 0)`    | `oklch(92% 0 0)`      | Default code color        |
| `--syntax-comment`  | `oklch(55.6% 0 0)`    | `oklch(65% 0 0)`      | comments, `.hljs-comment` |
| `--syntax-keyword`  | `oklch(45% 0.09 280)` | `oklch(80% 0.09 280)` | keywords                  |
| `--syntax-string`   | `oklch(40% 0.12 145)` | `oklch(78% 0.12 145)` | strings                   |
| `--syntax-number`   | `oklch(45% 0.11 60)`  | `oklch(80% 0.1 60)`   | numbers                   |
| `--syntax-function` | `oklch(45% 0.11 240)` | `oklch(80% 0.1 240)`  | functions                 |
| `--syntax-type`     | `oklch(42% 0.09 320)` | `oklch(78% 0.08 320)` | types/classes             |
| `--syntax-attr`     | `oklch(38% 0.1 90)`   | `oklch(75% 0.09 90)`  | attributes                |
| `--syntax-tag`      | `oklch(42% 0.11 25)`  | `oklch(78% 0.1 25)`   | tags                      |
| `--syntax-operator` | `oklch(35% 0 0)`      | `oklch(85% 0 0)`      | operators/punctuation     |
| `--syntax-error`    | `oklch(55% 0.21 27)`  | `oklch(70% 0.19 27)`  | deletions/errors          |

### 5.3 Shape, motion and layout

| Token group | Tokens                                                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| Radius      | `--radius-sm` `.375rem` · `--radius-md` `.5rem` · `--radius-lg` `.75rem` · `--radius-full` `9999px`                    |
| Shadow      | `--shadow-sm` · `--shadow-md` · `--shadow-lg` (stronger in dark)                                                       |
| Z-index     | `--z-dropdown` 100 · `--z-fixed` 200 · `--z-dialog` 300 · `--z-toast` 400                                              |
| Motion      | `--transition-fast` 120ms · `--transition-base` 200ms · `--transition-slow` 300ms                                      |
| Typography  | `--font-sans` · `--font-mono` · `--font-size-sm/base/lg/xl/2xl` · `--line-height-tight/base` · `--letter-spacing-wide` |
| Layout      | `--grid-max-width` 120rem · `--grid-gutter-size` 2rem                                                                  |

### 5.4 Legacy aliases

The old Material-style names (`--color-primary`, `--color-on-primary-container`,
`--typography-font`, …) still exist in `_base.scss` and simply reference the
new tokens, so existing customizations keep working. New code should use the
canonical `--primary` / `--muted` / … names.

To override a token, redeclare it in your own `:root` after loading the
stylesheet:

```css
:root {
  --primary: #111111;
  --radius-md: 0.75rem;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

---

## 6. The JS enhancement layer

Everything is optional and dependency-free. The CSS works alone. The JS layer
upgrades components that carry data attributes.

### 6.1 Build

`npm run build:js` runs `scripts/build-js.mjs` (esbuild):

- `dist/lotus.js`: ESM bundle for bundlers / `import`
- `dist/lotus.min.js`: minified IIFE exposing the `lotus` global (script tag)
- `dist/lotus.d.ts`: hand-written types, copied from `js/types.d.ts`

Script-tag usage (auto-initialises on `DOMContentLoaded`):

```html
<script src="https://unpkg.com/lotus-css/dist/lotus.min.js" defer></script>
```

Module usage (call `init()` yourself):

```js
import { init, toast } from "lotus-css/js";
init();
toast("Saved", { type: "success" });
```

Set `data-lotus-no-init` on `<html>` to disable auto-initialisation.

### 6.2 Modules and data attributes

| Module           | Attribute / API                                         | What it does                                                  |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------- | ----- | --- | --------- |
| Theme            | `[data-theme-toggle]`, `setTheme()/toggleTheme()`       | Auto + manual dark mode, persisted, emits `lotus:themechange` |
| Dialog           | `[data-dialog-open="#id"]`, `[data-dialog-close]`       | Opens/closes native `<dialog>` modals                         |
| Sheet            | `[data-sheet-open="#id"]`, `[data-sheet-close]`         | Side-drawer dialogs (`data-side="left                         | right | top | bottom"`) |
| Tabs             | `[data-tabs]` + `[data-tab]` / `[data-tab-panel]`       | Accessible tab switching                                      |
| Toast            | `[data-toast]` + `data-toast-type/-title`, `toast(msg, opts)` | Stacked notifications                                   |
| Accordion        | `[data-accordion]` + `[data-accordion-item]`            | Exclusive `<details>` groups (`data-accordion-multiple`, `data-disabled`) |
| Dropdown         | `.dropdown`                                             | Click-outside close                                           |
| Carousel         | `[data-carousel]` + `[data-carousel-track]` + prev/next | Scroll-snap track navigation                                  |
| Popover          | `[data-popover-trigger]` + `[data-popover]`             | Trigger-positioned panel, flips near viewport edge            |
| Copy             | every `pre` (skip: `data-no-copy`)                      | Adds a copy button with feedback                              |
| Highlight        | every `pre code`                                        | Auto-highlights via `window.hljs` when present                |
| Animate          | `[data-animate="fade-up"]` etc.                         | IntersectionObserver scroll reveals                           |
| View Transitions | `viewTransition(fn)`, `html.view-transitions`           | Page-transition helper + CSS defaults                         |

### 6.3 Code blocks

Copy buttons are added by `initCopy()` and styled in `scss/_code.scss`. They
fade in on hover/focus of the block. Syntax highlighting is progressive: if a
highlight.js instance exists as `window.hljs`, `initHighlight()` runs it over
`pre code` blocks. The docs site registers its own curated language set in
`docs/js/main.js`; consumers can register their own before `init()`.

### 6.4 Unit tests

`npm test` runs the Vitest suite (`tests/*.test.ts`) in a jsdom environment,
one spec file per module (theme, toast, tabs, dialog, code, animate, …). The
suite runs in CI, so keep it green when you touch `js/`:

```bash
npm test             # one-shot run
npm run test:watch   # watch mode
```

---

## 7. The docs site

The docs are a plain **Vite** multi-page app (`docs/index.html` +
`docs/demo.html` + the component pages `docs/accordion.html` and
`docs/alert.html`). The framework is pulled in through
`docs/css/site.scss`:

```scss
@use "../../scss/lotus";
```

so the docs always reflect the current source with instant HMR in dev.

Code samples are kept in exactly one place. Pages write
`<pre data-sample="id"></pre>` and `docs/js/samples.js` (`renderSamples()`)
fills them at runtime, so sample markup is never duplicated or hand-escaped
inside HTML.

The page shell (head, nav, footer) is shared the same way: `docs/partials/*.html`
hold the chrome and a tiny Vite plugin (`scripts/html-partials.mjs`) inlines
`<!-- #include:nav -->` markers in dev and build. Note that editing a partial
needs a `npm run dev` restart (Vite caches the transformed HTML per URL). Per-page tweaks (the clock, the
Demo, Accordion and Alert links) are toggled with `.hide-on-index`/`.hide-on-demo`/
`.hide-on-accordion`/`.hide-on-alert` classes on `<body>`. Component pages
follow a shared layout (`.doc-header` + the demo page's sidebar/content
columns). The lotus logo lives in `docs/public/` (SVG source plus a 512&nbsp;px
PNG, used as the favicon), and the site uses Google Material Symbols for its
icons instead of emoji.

- Local development: `npm run dev`
- Production build: `npm run build:docs` → `docs-dist/`
- Deployment: GitHub Actions builds and deploys `docs-dist/` to GitHub Pages
  on every push to `main` (`.github/workflows/pages.yml`).

To enable that workflow, set the Pages source of the repository to
**GitHub Actions** (Settings → Pages → _Build and deployment_ → _Source:
GitHub Actions_).

---

## 8. Continuous integration

`.github/workflows/ci.yml` runs on every push/PR and will fail on:

- lint errors (`npm run lint`)
- `dist/` not matching what the source produces
  (`git diff --exit-code -- dist/`)
- docs build errors

This means contributors rebuild `dist/` themselves. There is no separate
"maintainer compiles it after merging" step.

---

## 9. Releasing (npm + CDNs)

Releases are tag-driven. From a clean `main`:

```bash
# 1. Pick the new version (semver); the `version` script rebuilds dist/
#    and stages it so the commit and tag carry a fresh banner
npm version patch    # or minor / major

# 2. Push the new version commit and tag
git push && git push --tags
```

`.github/workflows/release.yml` then:

1. Runs `npm ci`, `npm run lint` (via `prepublishOnly`),
2. Rebuilds `dist/` (`prepublishOnly`),
3. Runs `npm publish`.

The package is then available from:

- **npm:** `npm install lotus-css`
- **unpkg:** `https://unpkg.com/lotus-css@latest`
- **jsDelivr:** `https://cdn.jsdelivr.net/npm/lotus-css@latest`

> The workflow needs an **`NPM_TOKEN`** secret in the repository settings
> (npm → _Access Tokens_ → generate a publish token). The package `files` field
> ships only `dist/`, so the published tarball stays small.

### Releasing checklist

1. `npm run lint` is clean.
2. `npm run build` succeeds and `git diff --exit-code -- dist/` is empty.
3. `npm version <patch|minor|major>`; check the banner in `dist/lotus.css`
   picked up the new version.
4. Push commit + tag; watch the _Release to npm_ run on GitHub.
5. The docs deploy to GitHub Pages runs automatically on the `main` push.

---

## 10. Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contributor flow. Short version:

1. Fork, create a branch.
2. Edit the Sass partials in `scss/` (keep comments explaining _why_).
3. `npm run lint` clean, `npm run build:css`, commit `dist/` too.
4. Open a PR; CI verifies everything automatically.

---

## 11. Troubleshooting

| Problem                                           | Fix                                                                         |
| ------------------------------------------------- | --------------------------------------------------------------------------- |
| `npm run build` fails on Windows with `ENOTEMPTY` | Remove `node_modules/` and `package-lock.json`, then `npm install` again    |
| Docs don't pick up new Sass                       | Restart `npm run dev`; Vite caches transformed deps in `node_modules/.vite` |
| CI fails on "dist is up to date"                  | Run `npm run build:css` and commit the changed `dist/` files                |
| npm publish 403                                   | Check the `NPM_TOKEN` secret and that the package name is available on npm  |
| Prefixed styles look wrong                        | Adjust the `browserslist` field in `package.json`                           |

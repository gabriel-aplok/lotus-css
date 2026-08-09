# LOTUS.css

<p align="center">
	<img src="docs/public/logo.svg" alt="LOTUS.css" width="96" height="96">
</p>

LOTUS.css is a classless CSS framework. You style semantic HTML and that's
mostly it. It ships a neutral, oklch-based token system, layout utilities, a
bunch of components, and an optional JavaScript layer for the parts that
actually need JavaScript.

The whole CSS file is about 52 kB minified. The JS layer is roughly 9 kB.

## What you get

- Semantic HTML looks presentable with zero classes.
- Every color, radius, shadow and font is a CSS variable. Override any of them.
- Automatic dark mode via `prefers-color-scheme`, plus a manual
  `.dark`/`.light` override and a `[data-theme-toggle]` button.
- A 12-column responsive grid.
- 25+ components: navs, tabs, cards, tags, dialogs, sheets, alerts, toasts,
  tooltips, popovers, breadcrumbs, pagination, avatars, badges, switches,
  accordions, carousels, toggles, spinners, skeletons, separators, scroll
  areas, code blocks, and a few more.
- Scroll reveals, page transitions, and code blocks with a copy button and
  automatic syntax highlighting. All optional, all progressive.
- Modern browsers only. IE support ended years ago and I'm not bringing it
  back.

## Install

### npm

```bash
npm install lotus-css
```

```html
<link rel="stylesheet" href="node_modules/lotus-css/dist/lotus.css" />
```

For the interactive components add the JS layer:

```html
<script src="node_modules/lotus-css/dist/lotus.min.js" defer></script>
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lotus-css@latest" />
<!-- or -->
<link rel="stylesheet" href="https://unpkg.com/lotus-css@latest" />
```

### As a module

```js
import { init, toast } from "lotus-css/js";

init(); // dialogs, tabs, toasts, carousels, copy buttons, everything

toast("Saved", { type: "success" });
```

### Manual download

The latest compiled files are on the
[releases](https://github.com/gabriel-aplok/lotus-css/releases) page:
`dist/lotus.css` (readable), `dist/lotus.min.css` (minified), plus the JS
layer (`dist/lotus.js` / `dist/lotus.min.js`).

## Customize

Every design token is a CSS custom property. Override it after loading the
framework:

```css
:root {
  --primary: #111111;
  --background: #fafafa;
  --foreground: #18181b;
  --radius-md: 0.75rem;
  --font-sans: "Inter", system-ui, sans-serif;
  --grid-max-width: 108rem;
}
```

Dark mode is automatic. Force it with `class="dark"` on `<html>`, or use
`class="light"` to ignore the OS setting. The old Material-style `--color-*`
names still work as aliases, so existing customizations keep running.

The [docs site](https://gabriel-aplok.github.io/lotus-css) has the full token
list, a [live demo](https://gabriel-aplok.github.io/lotus-css/demo.html) of
every component, [accordion docs](https://gabriel-aplok.github.io/lotus-css/accordion.html)
with copy-ready snippets, and the [development guide](DEVELOPMENT.md)
documents the token system (§5) and the JS layer (§6).

## Development

Working on it? Good. See [DEVELOPMENT.md](DEVELOPMENT.md) for the full
build, lint, typecheck, test and release workflow. The short version:

```bash
npm install
npm run dev        # docs dev server with HMR
npm run watch      # rebuild dist/ on scss changes
npm run watch:js   # rebuild dist/lotus.js on js/ changes
npm run lint       # stylelint must pass
npm run typecheck  # tsc must pass
npm test           # vitest unit tests for the JS layer
npm run build      # framework CSS + JS + docs
```

Found a bug or want a feature? Check [CONTRIBUTING.md](CONTRIBUTING.md)
before opening a pull request.

## License

MIT. See [LICENSE.md](LICENSE.md).

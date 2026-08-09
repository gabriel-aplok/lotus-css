# Contributing to LOTUS.css

Thanks for helping out.

## Getting started

1. Fork the repository and create a feature branch.
2. Install dependencies: `npm install`
3. Start the docs dev server: `npm run dev`

## Making changes

- Edit the Sass source in [`scss/`](scss/) and the JS layer in [`js/`](js/).
  Never edit `dist/` by hand.
- Comment the rationale, not the obvious. Say why a change exists.
- Run `npm run lint` and `npm run typecheck`; both must be clean.
- Rebuild the distribution with `npm run build:dist` (CSS + JS).
- Commit the regenerated `dist/` files too. CI verifies they match the
  source, and a PR that skips this step fails the checks.

## Submitting a PR

1. Make sure `npm run lint`, `npm run typecheck` and `npm run build` all pass.
2. Open a pull request that says what changed and why.
3. CI runs lint, typecheck, build and a dist-in-sync check. Fix anything it flags.

Keep PRs small and focused. If you just want to report a bug or ask a
question, open an [issue](https://github.com/gabriel-aplok/lotus-css/issues)
instead of a PR.

The full build, docs and release workflow lives in
[DEVELOPMENT.md](DEVELOPMENT.md).

// Vite plugin: inlines <!-- #include:name --> with docs/partials/name.html.
// The page shell (head, nav, footer) lives in exactly one place per partial
// and is shared by every page, in dev and in the production build.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const partialsDir = fileURLToPath(new URL('../docs/partials', import.meta.url));

export function htmlPartials() {
	return {
		name: 'lotus-html-partials',
		transformIndexHtml: {
			order: 'pre',
			handler(html) {
				return html.replace(/<!--\s*#include:([a-z0-9_-]+)\s*-->/gi, (match, name) => {
					try {
						return readFileSync(join(partialsDir, `${name}.html`), 'utf8');
					} catch {
						throw new Error(`[html-partials] no partial found for "${name}" in docs/partials/`);
					}
				});
			},
		},
	};
}

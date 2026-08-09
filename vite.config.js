import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { htmlPartials } from './scripts/html-partials.mjs';

const docs = fileURLToPath(new URL('./docs', import.meta.url));

export default defineConfig({
	root: docs,
	plugins: [htmlPartials()],
	// Relative base so the site works from any subpath (e.g. GitHub Pages).
	base: './',
	build: {
		outDir: fileURLToPath(new URL('./docs-dist', import.meta.url)),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: fileURLToPath(new URL('./docs/index.html', import.meta.url)),
				components: fileURLToPath(new URL('./docs/components.html', import.meta.url)),
			},
		},
	},
});

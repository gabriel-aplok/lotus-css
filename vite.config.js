import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const docs = fileURLToPath(new URL('./docs', import.meta.url));

export default defineConfig({
	root: docs,
	// Relative base so the site works from any subpath (e.g. GitHub Pages).
	base: './',
	build: {
		outDir: fileURLToPath(new URL('./docs-dist', import.meta.url)),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: fileURLToPath(new URL('./docs/index.html', import.meta.url)),
				demo: fileURLToPath(new URL('./docs/demo.html', import.meta.url)),
			},
		},
	},
});

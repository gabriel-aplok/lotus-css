// Builds distributable LOTUS.js from the TS source in js/.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, watch, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const WATCH = process.argv.includes('--watch');

function banner() {
	return `/*!
 * lotus.js v${pkg.version}
 * Optional JS enhancements for lotus.css: MIT License.
 * https://github.com/gabriel-aplok/lotus-css
 */\n`;
}

const shared = {
	entryPoints: [join(root, 'js', 'index.ts')],
	bundle: true,
	// No external deps: lotus.js is dependency-free and tree-shakeable.
	format: 'esm',	target: ['es2020'],
	logLevel: 'silent',
};

async function buildBundle() {
	const start = Date.now();
	await Promise.all([
		build({ ...shared, outfile: join(root, 'dist', 'lotus.js') }),
		build({
			...shared,
			format: 'iife',
			globalName: 'lotus',
			minify: true,
			outfile: join(root, 'dist', 'lotus.min.js'),
		}),
	]);

	// Ship the hand-written type declarations.
	copyFileSync(join(root, 'js', 'types.d.ts'), join(root, 'dist', 'lotus.d.ts'));

	const kb = (readFileSync(join(root, 'dist', 'lotus.min.js')).byteLength / 1024).toFixed(1);
	console.log(`✔ built lotus.js v${pkg.version}  (${kb} kB minified, ${Date.now() - start}ms)`);
}

buildBundle().catch((error) => {
	console.error(`✖ build failed: ${error.message}`);
	process.exitCode = 1;
});

if (WATCH) {
	console.log('👀 watching js/ for changes…');
	let timer;
	watch(join(root, 'js'), { recursive: true }, (_event, filename) => {
		if (!filename || !filename.endsWith('.ts')) return;
		clearTimeout(timer);
		timer = setTimeout(() => {
			buildBundle().catch((error) => console.error(`✖ build failed: ${error.message}`));
		}, 50);
	});
}

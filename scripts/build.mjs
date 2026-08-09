// Builds distributable LOTUS.css from scss/lotus.scss.
import { compile } from 'sass';
import { transform, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import { readFileSync, writeFileSync, mkdirSync, watch } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const WATCH = process.argv.includes('--watch');

function banner() {
	return `/*!
 * lotus.css v${pkg.version}
 * A minimal CSS framework: MIT License.
 * https://github.com/gabriel-aplok/lotus-css
 */\n\n`;
}

function build() {
	const result = compile(join(root, 'scss', 'lotus.scss'), {
		style: 'expanded',
		loadPaths: [join(root, 'scss')],
	});

	// Minified + vendor-prefixed build, targeting the browserslist range.
	const { code } = transform({		filename: 'lotus.css',
		code: Buffer.from(result.css),
		minify: true,
		targets: browserslistToTargets(browserslist()),
	});

	mkdirSync(join(root, 'dist'), { recursive: true });
	writeFileSync(join(root, 'dist', 'lotus.css'), banner() + result.css);
	writeFileSync(join(root, 'dist', 'lotus.min.css'), banner() + code);

	const kb = (Buffer.byteLength(code) / 1024).toFixed(1);
	console.log(`✔ built lotus.css v${pkg.version}  (${kb} kB minified)`);
}

try {
	build();
} catch (error) {
	console.error(`✖ build failed: ${error.message}`);
	process.exitCode = 1;
}

if (WATCH) {
	console.log('👀 watching scss/ for changes…');
	let timer;
	watch(join(root, 'scss'), { recursive: true }, (_event, filename) => {
		if (!filename || !filename.endsWith('.scss')) return;
		clearTimeout(timer);
		timer = setTimeout(() => {
			try {
				build();
			} catch (error) {
				console.error(`✖ build failed: ${error.message}`);
			}
		}, 50);
	});
}

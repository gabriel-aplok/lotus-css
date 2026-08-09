// Generates the favicon / app-icon set from docs/public/logo.svg.
// Run `npm run favicons`; outputs are committed, so CI never needs to regen.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const outDir = fileURLToPath(new URL('../docs/public', import.meta.url));
const svg = readFileSync(join(outDir, 'logo.svg'));

const png = (size) => sharp(svg).resize(size, size, { fit: 'contain' }).png().toBuffer();

const ICON_SIZES = [
	['favicon-16x16.png', 16],
	['favicon-32x32.png', 32],
	['apple-touch-icon.png', 180],
	['android-chrome-192x192.png', 192],
	['android-chrome-512x512.png', 512],
	['logo.png', 512],
];

for (const [name, size] of ICON_SIZES) {
	await sharp(svg).resize(size, size, { fit: 'contain' }).png().toFile(join(outDir, name));
	console.log(`✔ ${name} (${size}x${size})`);
}

// favicon.ico: multi-size, PNG-compressed entries (Vista+ and modern browsers).
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map((s) => png(s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoSizes.length, 4);
let cursor = 6 + icoSizes.length * 16;
const chunks = [header];
icoSizes.forEach((size, i) => {
	const entry = Buffer.alloc(16);
	entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
	entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
	entry.writeUInt8(0, 2); // palette
	entry.writeUInt8(0, 3); // reserved
	entry.writeUInt16LE(1, 4); // color planes
	entry.writeUInt16LE(32, 6); // bits per pixel
	entry.writeUInt32LE(icoPngs[i].length, 8);
	entry.writeUInt32LE(cursor, 12);
	chunks.push(entry);
	cursor += icoPngs[i].length;
});
chunks.push(...icoPngs);
writeFileSync(join(outDir, 'favicon.ico'), Buffer.concat(chunks));
console.log('✔ favicon.ico (16+32+48)');

const manifest = {
	name: 'LOTUS.css',
	short_name: 'LOTUS.css',
	description:
		'A classless CSS framework with a neutral oklch token system, automatic dark mode and an optional JS layer.',
	start_url: './',
	display: 'standalone',
	background_color: '#fafafa',
	theme_color: '#18181b',
	icons: [
		{ src: './android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
		{ src: './android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
	],
};
writeFileSync(join(outDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log('✔ site.webmanifest');

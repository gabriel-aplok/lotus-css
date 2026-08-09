// Renders the open-graph social card (scripts/social-card.html) to
// docs/public/og-image.png (1200x630) using headless Chrome.
// Run `npm run social-card`; the output is committed.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const html = fileURLToPath(new URL('./social-card.html', import.meta.url));
const out = join(root, 'docs', 'public', 'og-image.png');

function findChrome() {
	if (process.platform === 'win32') {
		const candidates = [
			'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
			'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
			join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
		];
		for (const p of candidates) {
			if (p && existsSync(p)) return p;
		}
	}
	for (const name of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'chrome']) {
		try {
			const p = execFileSync('which', [name], { stdio: 'pipe' }).toString().trim();
			if (p) return p;
		} catch {
			/* keep looking */
		}
	}
	return null;
}

const chrome = findChrome();
if (!chrome) {
	console.error('[social-card] Google Chrome / Chromium not found; skipping og-image.png generation.');
	process.exit(1);
}

const url = `file:///${html.replace(/\\/g, '/')}`;
execFileSync(
	chrome,
	[
		'--headless=new',
		'--disable-gpu',
		'--hide-scrollbars',
		'--force-device-scale-factor=1',
		'--virtual-time-budget=4000',
		`--screenshot=${out}`,
		'--window-size=1200,630',
		url,
	],
	{ stdio: 'inherit' },
);
console.log(`✔ og-image.png (1200x630)`);

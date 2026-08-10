import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initSheets, openSheet, resolveSnapPoint, clampSnapHeight } from '../js/sheet';
import { topLevelBlocks } from './css-helpers';

describe('resolveSnapPoint', () => {
	it('treats numbers 0–1 as viewport fractions', () => {
		expect(resolveSnapPoint(0.5, 800, 16)).toBe(400);
		expect(resolveSnapPoint(1, 800, 16)).toBe(800);
	});

	it('treats numbers above 1 as pixels', () => {
		expect(resolveSnapPoint(300, 800, 16)).toBe(300);
	});

	it('resolves rem strings against the root font size', () => {
		expect(resolveSnapPoint('24rem', 800, 10)).toBe(240);
		expect(resolveSnapPoint(' 25rem ', 800, 16)).toBe(400);
	});

	it('treats string fractions as viewport fractions', () => {
		expect(resolveSnapPoint('0.25', 800, 16)).toBe(200);
	});

	it('falls back to the full viewport for unknown values', () => {
		expect(resolveSnapPoint('bogus', 800, 16)).toBe(800);
	});
});

describe('sheet CSS load-state guard', () => {
	// Regression guard: an author-level display on a closed dialog overrides
	// the UA's dialog:not([open]){ display:none }, leaving every sheet visible
	// on page load. Any dialog rule without [open] must not set display.
	const files = ['scss/_sheet.scss', 'scss/_dialog.scss', 'dist/lotus.css'];

	for (const file of files) {
		const css = readFileSync(join(process.cwd(), file), 'utf8');
		const dialogBlocks = topLevelBlocks(css).filter((block) =>
			/(^|,)\s*dialog(\.|\[|::|\s|$)/.test(block.selector)
		);

		it(`${file}: closed dialog rules never set display`, () => {
			expect(dialogBlocks.length).toBeGreaterThan(0);
			for (const block of dialogBlocks) {
				if (block.selector.includes('[open]')) continue;
				expect(
					block.body,
					`closed dialog rule "${block.selector}" must not declare display`
				).not.toMatch(/display\s*:/);
			}
		});

		if (css.includes('dialog.sheet')) {
			it(`${file}: the open sheet rule scopes display:flex to [open]`, () => {
				const openSheet = dialogBlocks.find(
					(block) => block.selector.includes('dialog.sheet') && block.selector.includes('[open]')
				);
				expect(openSheet, `missing dialog.sheet[open] rule in ${file}`).toBeDefined();
				expect(openSheet!.body).toMatch(/display\s*:\s*flex/);
			});
		}
	}
});

describe('clampSnapHeight', () => {
	const min = 240;
	const max = 700;

	it('grows a bottom sheet on an upward drag (negative delta)', () => {
		expect(clampSnapHeight(240, -100, min, max, false)).toBe(340);
		expect(clampSnapHeight(240, -1000, min, max, false)).toBe(700);
	});

	it('grows a top sheet on a downward drag (positive delta)', () => {
		expect(clampSnapHeight(240, 100, min, max, true)).toBe(340);
		expect(clampSnapHeight(240, 1000, min, max, true)).toBe(700);
	});

	it('clamps to the snap range in both directions', () => {
		expect(clampSnapHeight(240, 500, min, max, false)).toBe(240); // below min → min
		expect(clampSnapHeight(700, -500, min, max, false)).toBe(700); // above max → max
	});
});

describe('sheets', () => {
	beforeEach(() => {
		// Pixel snaps (jsdom reports a 0 viewport height, so fractions would
		// resolve to 0 and be dropped — resolveSnapPoint covers those cases).
		document.body.innerHTML = `
			<button data-sheet-open="s1">open</button>
			<dialog class="sheet" id="s1" data-side="bottom" data-sheet-snaps="384 768">
				<div class="sheet-handle" data-sheet-handle tabindex="0"></div>
				<button data-sheet-close>close</button>
			</dialog>
		`;
		initSheets();
	});

	const dialog = (): HTMLDialogElement => document.querySelector<HTMLDialogElement>('#s1')!;

	it('opens and closes via data attributes', () => {
		const dlg = dialog();
		const showModal = vi.fn();
		const close = vi.fn();
		dlg.showModal = showModal;
		dlg.close = close;

		(document.querySelector('[data-sheet-open]') as HTMLElement).click();
		expect(showModal).toHaveBeenCalled();

		(document.querySelector('[data-sheet-close]') as HTMLElement).click();
		expect(close).toHaveBeenCalled();
	});

	it('starts at the first snap point when opened', () => {
		const dlg = dialog();
		dlg.showModal = vi.fn();
		(document.querySelector('[data-sheet-open]') as HTMLElement).click();
		expect(dlg.style.height).toBe('384px'); // first snap point
	});

	it('openSheet leaves side sheets at their natural height', () => {
		document.body.innerHTML = `<dialog class="sheet" id="side" data-side="right" data-sheet-snaps="24rem 1"></dialog>`;
		initSheets();
		const dlg = document.querySelector<HTMLDialogElement>('#side')!;
		dlg.showModal = vi.fn();
		openSheet(dlg);
		expect(dlg.style.height).toBe('');
	});


	it('Arrow keys cycle the snap points and toggle data-expanded', () => {
		const dlg = dialog();
		dlg.showModal = vi.fn();
		openSheet(dlg);
		expect(dlg.style.height).toBe('384px');

		const handle = document.querySelector<HTMLElement>('[data-sheet-handle]')!;
		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(dlg.style.height).toBe('768px');
		expect(dlg.hasAttribute('data-expanded')).toBe(true);
		expect(handle.getAttribute('aria-valuenow')).toBe('768');

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(dlg.style.height).toBe('384px');
		expect(dlg.hasAttribute('data-expanded')).toBe(false);
	});

	it('PageUp and PageDown jump to the extremes', () => {
		const dlg = dialog();
		dlg.showModal = vi.fn();
		openSheet(dlg);
		const handle = document.querySelector<HTMLElement>('[data-sheet-handle]')!;

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));
		expect(dlg.style.height).toBe('768px');

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
		expect(dlg.style.height).toBe('384px');
	});
});

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { topLevelBlocks } from './css-helpers';

// Load-state guards for hidden-by-default overlays (same regression class as
// the sheet bug, where an author-level display on a closed dialog overrode the
// UA's dialog:not([open]){ display:none } and left every sheet visible on load).
//
// Overlays hide by different mechanisms, so the invariant is per component:
//   - Native dialogs (sheets): closed rules must never set display — the UA's
//     display:none does the hiding, and author display would override it.
//   - details-based dropdowns: the panel must never set display — native
//     <details> open/close does the hiding.
//   - Opacity/visibility overlays (popover, toast): the closed rule must carry
//     the hiding declaration (visibility:hidden / opacity:0). display is the
//     layout mechanism and is fine — visibility is a separate concern.

type Overlay = {
	name: string;
	/** The default (closed) rule for this overlay. */
	main: (selector: string) => boolean;
	/** Any rule that targets the closed overlay (including variants). */
	closed: (selector: string) => boolean;
	/** Selector of the open rule, or null when open is native. */
	openSelector: string | null;
	/** Declaration the open rule must carry to turn the overlay visible. */
	openDecl: RegExp | null;
	/** Declaration the main closed rule must carry to hide the overlay. */
	closedHide: RegExp | null;
	/** True when the closed rules must not declare display at all. */
	noDisplay: boolean;
	files: string[];
};

const overlays: Overlay[] = [
	{
		name: 'popover',
		main: (selector) => selector === '.popover',
		closed: (selector) => selector.includes('.popover') && !selector.includes('.open'),
		openSelector: '.popover.open',
		openDecl: /visibility\s*:\s*visible/,
		closedHide: /visibility\s*:\s*hidden/,
		noDisplay: true,
		files: ['scss/_popover.scss', 'dist/lotus.css'],
	},
	{
		name: 'dropdown panel',
		main: (selector) => /details\.dropdown[^{}]*:last-child$/.test(selector),
		closed: (selector) => /details\.dropdown[^{}]*:last-child$/.test(selector),
		openSelector: null, // native <details> open state
		openDecl: null,
		closedHide: null,
		noDisplay: true,
		files: ['scss/_dropdown.scss', 'dist/lotus.css'],
	},
	{
		name: 'toast item',
		main: (selector) => selector === '.toast-item',
		closed: (selector) => selector.includes('.toast-item') && !selector.includes('.is-in'),
		openSelector: '.toast-item.is-in',
		openDecl: /opacity\s*:\s*1/,
		closedHide: /opacity\s*:\s*0/,
		noDisplay: false, // display:flex is the row layout; hiding is via opacity
		files: ['scss/_toast.scss', 'dist/lotus.css'],
	},
];

describe('overlay load-state guards', () => {
	for (const overlay of overlays) {
		describe(overlay.name, () => {
			for (const file of overlay.files) {
				const css = readFileSync(join(process.cwd(), file), 'utf8');
				const blocks = topLevelBlocks(css);

				if (overlay.noDisplay) {
					it(`${file}: closed rules never set display`, () => {
						const closedBlocks = blocks.filter((block) => overlay.closed(block.selector));
						expect(closedBlocks.length, `missing closed rule in ${file}`).toBeGreaterThan(0);
						for (const block of closedBlocks) {
							expect(
								block.body,
								`closed ${overlay.name} rule "${block.selector}" must not declare display`
							).not.toMatch(/display\s*:/);
						}
					});
				}

				if (overlay.closedHide) {
					it(`${file}: the default closed rule hides the overlay`, () => {
						const main = blocks.find((block) => overlay.main(block.selector));
						expect(main, `missing default closed rule in ${file}`).toBeDefined();
						expect(main!.body).toMatch(overlay.closedHide!);
					});
				}

				if (overlay.openSelector && overlay.openDecl) {
					it(`${file}: the open rule turns the overlay visible`, () => {
						const openBlocks = blocks.filter((block) => block.selector.includes(overlay.openSelector!));
						// Nested SCSS (&.open / &.is-in) lives inside the main
						// block in source; dist hoists it to a top-level rule.
						const bodies = openBlocks.length > 0
							? openBlocks.map((block) => block.body)
							: [blocks.find((block) => overlay.main(block.selector))?.body ?? ''];
						expect(bodies.some((body) => overlay.openDecl!.test(body))).toBe(true);
					});
				}
			}
		});
	}
});

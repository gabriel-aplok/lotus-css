import { beforeEach, describe, expect, it, vi } from 'vitest';

// The module auto-inits on import; opt out so init() is exercised explicitly.
vi.hoisted(() => {
	document.documentElement.setAttribute('data-lotus-no-init', '');
});

import { init, version } from '../js/index';
import { mockMatchMedia, stubIntersectionObserver } from './helpers';

describe('framework entry', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		mockMatchMedia();
		stubIntersectionObserver();
	});

	it('exposes a version', () => {
		expect(version).toBe('0.5.0');
	});

	it('wires every enhancement without throwing', () => {
		document.body.innerHTML = `
			<button data-theme-toggle>theme</button>
			<button data-dialog-open="d">open</button>
			<dialog id="d"><button data-dialog-close>close</button></dialog>
			<div data-tabs><button data-tab="x" class="active">X</button></div>
			<div data-tab-panel="x">panel</div>
			<div data-accordion><details data-accordion-item><summary>s</summary></details></div>
			<details class="dropdown"><summary>m</summary></details>
			<div data-carousel><div data-carousel-track></div></div>
			<button data-popover-trigger="p">p</button>
			<div class="popover" id="p"></div>
			<button class="toggle" aria-pressed="false">t</button>
			<pre><code>code</code></pre>
			<div data-animate></div>
		`;

		expect(() => init()).not.toThrow();

		// Copy buttons are injected.
		expect(document.querySelector('.copy-button')).not.toBeNull();

		// Toggle listeners are live.
		const toggle = document.querySelector<HTMLElement>('.toggle')!;
		toggle.click();
		expect(toggle.getAttribute('aria-pressed')).toBe('true');

		// Theme toggle button toggles the theme.
		const themeBtn = document.querySelector<HTMLElement>('[data-theme-toggle]')!;
		themeBtn.click();
		expect(document.documentElement.classList.contains('dark') || document.documentElement.classList.contains('light')).toBe(true);
	});
});

import { beforeEach, describe, expect, it } from 'vitest';
import { initTabs } from '../js/tabs';

function fixture(): void {
	document.body.innerHTML = `
		<div class="tabs" data-tabs>
			<button data-tab="a" class="active">A</button>
			<button data-tab="b">B</button>
		</div>
		<div data-tab-panel="a">panel a</div>
		<div data-tab-panel="b" hidden>panel b</div>
	`;
}

describe('tabs', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('honours the initial .active button', () => {
		fixture();
		initTabs();
		const [a, b] = document.querySelectorAll<HTMLElement>('[data-tab]');
		expect(a.classList.contains('active')).toBe(true);
		expect(a.getAttribute('aria-selected')).toBe('true');
		expect(b.getAttribute('aria-selected')).toBe('false');
	});

	it('switches buttons and panels on click', () => {
		fixture();
		initTabs();
		const [a, b] = document.querySelectorAll<HTMLElement>('[data-tab]');
		b.click();
		expect(b.classList.contains('active')).toBe(true);
		expect(b.getAttribute('aria-selected')).toBe('true');
		expect(a.getAttribute('aria-selected')).toBe('false');

		const panels = document.querySelectorAll<HTMLElement>('[data-tab-panel]');
		expect(panels[0].hidden).toBe(true);
		expect(panels[1].hidden).toBe(false);
	});
});

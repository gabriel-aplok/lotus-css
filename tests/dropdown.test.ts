import { beforeEach, describe, expect, it } from 'vitest';
import { initDropdowns } from '../js/dropdown';

describe('dropdowns', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<details class="dropdown" open>
				<summary>Menu</summary>
				<div class="dropdown-menu"><a href="#">Item</a></div>
			</details>
		`;
		initDropdowns();
	});

	it('closes on an outside click', () => {
		document.body.click();
		const dd = document.querySelector<HTMLElement>('.dropdown')!;
		expect(dd.hasAttribute('open')).toBe(false);
	});

	it('stays open when clicking inside', () => {
		const dd = document.querySelector<HTMLElement>('.dropdown')!;
		dd.querySelector('a')!.click();
		expect(dd.hasAttribute('open')).toBe(true);
	});
});

import { beforeEach, describe, expect, it } from 'vitest';
import { initAccordions } from '../js/accordion';

describe('accordions', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<div data-accordion>
				<details data-accordion-item open>
					<summary>One</summary>
				</details>
				<details data-accordion-item>
					<summary>Two</summary>
				</details>
			</div>
		`;
		initAccordions();
	});

	it('closes siblings when another item opens', () => {
		const items = document.querySelectorAll<HTMLElement>('[data-accordion-item]');
		items[1].setAttribute('open', '');
		items[1].dispatchEvent(new Event('toggle'));
		expect(items[0].hasAttribute('open')).toBe(false);
		expect(items[1].hasAttribute('open')).toBe(true);
	});

	it('does not touch siblings when an item closes', () => {
		const items = document.querySelectorAll<HTMLElement>('[data-accordion-item]');
		items[0].removeAttribute('open');
		items[0].dispatchEvent(new Event('toggle'));
		expect(items[1].hasAttribute('open')).toBe(false);
	});
});

import { beforeEach, describe, expect, it } from 'vitest';
import { initAccordions } from '../js/accordion';

describe('accordions', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	function fixture(groupAttrs = '') {
		document.body.innerHTML = `
			<div data-accordion ${groupAttrs}>
				<details data-accordion-item open>
					<summary>One</summary>
				</details>
				<details data-accordion-item>
					<summary>Two</summary>
				</details>
				<details data-accordion-item>
					<summary>Three</summary>
				</details>
			</div>
		`;
		initAccordions();
	}

	const items = () => [...document.querySelectorAll<HTMLElement>('[data-accordion-item]')];

	it('closes siblings when another item opens (exclusive)', () => {
		fixture();
		items()[1].setAttribute('open', '');
		items()[1].dispatchEvent(new Event('toggle'));
		expect(items()[0].hasAttribute('open')).toBe(false);
		expect(items()[1].hasAttribute('open')).toBe(true);
	});

	it('does not touch siblings when an item closes', () => {
		fixture();
		items()[0].removeAttribute('open');
		items()[0].dispatchEvent(new Event('toggle'));
		expect(items()[1].hasAttribute('open')).toBe(false);
	});

	it('keeps several items open in multiple mode', () => {
		fixture('data-accordion-multiple');
		items()[1].setAttribute('open', '');
		items()[1].dispatchEvent(new Event('toggle'));
		items()[2].setAttribute('open', '');
		items()[2].dispatchEvent(new Event('toggle'));
		expect(items()[0].hasAttribute('open')).toBe(true);
		expect(items()[1].hasAttribute('open')).toBe(true);
		expect(items()[2].hasAttribute('open')).toBe(true);
	});

	it('never lets a disabled item stay open', () => {
		fixture();
		items()[1].setAttribute('data-disabled', '');
		items()[1].setAttribute('open', '');
		items()[1].dispatchEvent(new Event('toggle'));
		expect(items()[1].hasAttribute('open')).toBe(false);
	});

	it('reconciles multiple markup-open items in exclusive mode', () => {
		fixture();
		items()[1].setAttribute('open', '');
		initAccordions(); // re-init on the same tree
		const opened = items().filter((item) => item.hasAttribute('open'));
		expect(opened.length).toBe(1);
	});
});

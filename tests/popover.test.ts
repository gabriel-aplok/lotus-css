import { beforeEach, describe, expect, it } from 'vitest';
import { initPopovers } from '../js/popover';
import { rect } from './helpers';

describe('popovers', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<button data-popover-trigger="p1">open</button>
			<div class="popover" id="p1"></div>
		`;
		initPopovers();
	});

	it('opens and positions the panel under its trigger', () => {
		const trigger = document.querySelector<HTMLElement>('[data-popover-trigger]')!;
		trigger.getBoundingClientRect = () => rect(100, 130, 50, 100);
		const panel = document.getElementById('p1')!;
		panel.getBoundingClientRect = () => rect(0, 60, 0, 120);

		trigger.click();
		expect(panel.classList.contains('open')).toBe(true);
		expect(panel.style.top).toBe('138px'); // trigger bottom + 8px gap
		expect(panel.style.left).toBe('50px');
	});

	it('closes on a second trigger click', () => {
		const trigger = document.querySelector<HTMLElement>('[data-popover-trigger]')!;
		trigger.click();
		trigger.click();
		expect(document.getElementById('p1')!.classList.contains('open')).toBe(false);
	});

	it('closes on Escape', () => {
		const trigger = document.querySelector<HTMLElement>('[data-popover-trigger]')!;
		trigger.click();
		expect(document.getElementById('p1')!.classList.contains('open')).toBe(true);
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		expect(document.getElementById('p1')!.classList.contains('open')).toBe(false);
	});

	it('closes on an outside click', () => {
		const trigger = document.querySelector<HTMLElement>('[data-popover-trigger]')!;
		trigger.click();
		document.body.click();
		expect(document.getElementById('p1')!.classList.contains('open')).toBe(false);
	});
});

import { beforeEach, describe, expect, it } from 'vitest';
import { initToggles } from '../js/toggle';

describe('toggle buttons', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('flips aria-pressed on standalone toggles', () => {
		document.body.innerHTML = '<button class="toggle" aria-pressed="false">Bold</button>';
		initToggles();
		const btn = document.querySelector<HTMLElement>('.toggle')!;
		btn.click();
		expect(btn.getAttribute('aria-pressed')).toBe('true');
		btn.click();
		expect(btn.getAttribute('aria-pressed')).toBe('false');
	});

	it('keeps toggle groups exclusive', () => {
		document.body.innerHTML = `
			<div class="toggle-group">
				<button class="toggle" aria-pressed="true">A</button>
				<button class="toggle" aria-pressed="false">B</button>
				<button class="toggle" aria-pressed="false">C</button>
			</div>
		`;
		initToggles();
		const btns = document.querySelectorAll<HTMLElement>('.toggle');
		btns[1].click();
		expect(btns[1].getAttribute('aria-pressed')).toBe('true');
		expect(btns[0].getAttribute('aria-pressed')).toBe('false');
		expect(btns[2].getAttribute('aria-pressed')).toBe('false');
	});
});

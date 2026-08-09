import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initCopy, initHighlight } from '../js/code';

describe('code blocks', () => {
	beforeEach(() => {
		document.body.innerHTML = '<pre><code class="language-js">const x = 1;</code></pre>';
		vi.useFakeTimers();
		// Fresh globals: no hljs, no clipboard mock leaking between tests.
		delete (window as unknown as { hljs?: unknown }).hljs;
		Reflect.deleteProperty(navigator, 'clipboard');
	});

	afterEach(() => {
		vi.useRealTimers();
		document.body.innerHTML = '';
		delete (window as unknown as { hljs?: unknown }).hljs;
		Reflect.deleteProperty(navigator, 'clipboard');
	});

	it('adds a copy button to every pre with code', () => {
		initCopy();
		expect(document.querySelector('.copy-button')).not.toBeNull();
		expect(document.querySelector('pre')?.classList.contains('has-copy')).toBe(true);
	});

	it('skips pre marked data-no-copy', () => {
		document.body.innerHTML = '<pre data-no-copy><code>x</code></pre>';
		initCopy();
		expect(document.querySelector('.copy-button')).toBeNull();
	});

	it('copies the code and shows feedback', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

		initCopy();
		const btn = document.querySelector<HTMLButtonElement>('.copy-button')!;
		btn.click();

		await vi.waitFor(() => expect(writeText).toHaveBeenCalledWith('const x = 1;'));
		await vi.waitFor(() => expect(btn.classList.contains('copied')).toBe(true));
		expect(btn.getAttribute('aria-label')).toBe('Copied');

		vi.advanceTimersByTime(2000);
		expect(btn.classList.contains('copied')).toBe(false);
		expect(btn.getAttribute('aria-label')).toBe('Copy code');
	});

	it('highlights with window.hljs when present', () => {
		const highlightElement = vi.fn().mockImplementation((el: HTMLElement) => {
			el.classList.add('hljs');
		});
		(window as unknown as { hljs: { highlightElement: typeof highlightElement } }).hljs = {
			highlightElement,
		};
		initHighlight();
		expect(highlightElement).toHaveBeenCalledTimes(1);
		expect(document.querySelector('code')?.classList.contains('hljs')).toBe(true);
	});

	it('is a no-op without window.hljs', () => {
		initHighlight();
		expect(document.querySelector('code')?.classList.contains('hljs')).toBe(false);
	});
});

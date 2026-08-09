import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { dismissToast, initToasts, toast } from '../js/toast';

describe('toast', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		document.body.innerHTML = '';
	});

	it('creates a stack and appends the item', () => {
		toast('Hello');
		const stack = document.querySelector('[data-toast-stack]');
		expect(stack).not.toBeNull();
		expect(stack?.querySelector('.toast-item')?.textContent).toContain('Hello');
	});

	it('renders type class, title, message and close button', () => {
		const item = toast('Saved', { type: 'success', title: 'Done' });
		expect(item.classList.contains('success')).toBe(true);
		expect(item.getAttribute('role')).toBe('status');
		expect(item.querySelector('.toast-title')?.textContent).toBe('Done');
		expect(item.querySelector('.toast-body')?.textContent).toBe('Saved');
		expect(item.querySelector('.toast-close')).not.toBeNull();
	});

	it('auto-dismisses after the duration', () => {
		const item = toast('Bye', { duration: 1000 });
		expect(item.isConnected).toBe(true);
		vi.advanceTimersByTime(1000 + 400);
		expect(item.isConnected).toBe(false);
	});

	it('stays when duration is 0', () => {
		const item = toast('Stay', { duration: 0 });
		vi.advanceTimersByTime(10_000);
		expect(item.isConnected).toBe(true);
		item.remove();
	});

	it('calls onDismiss when dismissed and removes the item', () => {
		const onDismiss = vi.fn();
		const item = toast('X', { duration: 0, onDismiss });
		dismissToast(item, onDismiss);
		expect(onDismiss).toHaveBeenCalledWith(item);
		vi.advanceTimersByTime(400);
		expect(item.isConnected).toBe(false);
	});

	it('initToasts binds declarative buttons', () => {
		const btn = document.createElement('button');
		btn.setAttribute('data-toast', 'Saved');
		btn.setAttribute('data-toast-title', 'Info');
		btn.setAttribute('data-toast-type', 'success');
		document.body.appendChild(btn);

		initToasts();
		btn.click();

		const item = document.querySelector('.toast-item');
		expect(item?.textContent).toContain('Saved');
		expect(item?.classList.contains('success')).toBe(true);
		expect(item?.querySelector('.toast-title')?.textContent).toBe('Info');
	});
});

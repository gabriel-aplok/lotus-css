import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { currentTheme, initTheme, resolvedTheme, setTheme, toggleTheme } from '../js/theme';
import { mockMatchMedia } from './helpers';

describe('theme', () => {
	beforeEach(() => {
		document.documentElement.classList.remove('dark', 'light');
		localStorage.clear();
		mockMatchMedia({ prefersDark: true });
	});

	afterEach(() => {
		document.documentElement.classList.remove('dark', 'light');
		localStorage.clear();
	});

	it('reports auto when no class is set', () => {
		expect(currentTheme()).toBe('auto');
	});

	it('setTheme("dark") toggles the class and persists', () => {
		setTheme('dark');
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(localStorage.getItem('lotus-theme')).toBe('dark');
	});

	it('setTheme("auto") clears classes and storage', () => {
		setTheme('dark');
		setTheme('auto');
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(document.documentElement.classList.contains('light')).toBe(false);
		expect(localStorage.getItem('lotus-theme')).toBeNull();
	});

	it('resolves auto against the OS preference', () => {
		expect(resolvedTheme()).toBe('dark');
		mockMatchMedia({ prefersDark: false });
		expect(resolvedTheme()).toBe('light');
	});

	it('toggleTheme flips the resolved theme and returns it', () => {
		expect(toggleTheme()).toBe('light');
		expect(currentTheme()).toBe('light');
		expect(toggleTheme()).toBe('dark');
	});

	it('dispatches lotus:themechange with theme details', () => {
		const listener = vi.fn();
		document.addEventListener('lotus:themechange', listener);
		setTheme('dark');
		expect(listener).toHaveBeenCalledTimes(1);
		expect(listener.mock.calls[0][0].detail).toEqual({ theme: 'dark', resolved: 'dark' });
		document.removeEventListener('lotus:themechange', listener);
	});

	it('initTheme applies the stored theme and binds toggle buttons', () => {
		localStorage.setItem('lotus-theme', 'dark');
		const btn = document.createElement('button');
		btn.setAttribute('data-theme-toggle', '');
		document.body.appendChild(btn);

		initTheme();
		expect(document.documentElement.classList.contains('dark')).toBe(true);

		btn.click();
		expect(currentTheme()).toBe('light');
		btn.click();
		expect(currentTheme()).toBe('dark');
	});
});

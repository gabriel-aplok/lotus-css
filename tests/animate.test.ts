import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { initAnimate } from '../js/animate';
import { mockMatchMedia, rect, stubIntersectionObserver } from './helpers';

describe('animate', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		document.documentElement.classList.remove('js');
		stubIntersectionObserver();
		mockMatchMedia();
	});

	afterEach(() => {
		document.documentElement.classList.remove('js');
	});

	it('adds the js class to <html>', () => {
		initAnimate();
		expect(document.documentElement.classList.contains('js')).toBe(true);
	});

	it('maps data-animate-delay to the --animate-delay property', () => {
		document.body.innerHTML = '<div data-animate="fade-up" data-animate-delay="150"></div>';
		initAnimate();
		const el = document.querySelector<HTMLElement>('[data-animate]')!;
		expect(el.style.getPropertyValue('--animate-delay')).toBe('150ms');
	});

	it('reveals everything immediately under reduced motion', () => {
		mockMatchMedia({ reducedMotion: true });
		document.body.innerHTML = '<div data-animate="fade-up"></div>';
		initAnimate();
		expect(document.querySelector<HTMLElement>('[data-animate]')!.classList.contains('in-view')).toBe(true);
	});

	it('reveals above-the-fold items synchronously', () => {
		document.body.innerHTML = '<div data-animate="fade-up" id="a"></div>';
		const el = document.querySelector<HTMLElement>('#a')!;
		el.getBoundingClientRect = () => rect(100, 200);
		initAnimate();
		expect(el.classList.contains('in-view')).toBe(true);
	});

	it('keeps off-screen items hidden until they intersect', () => {
		document.body.innerHTML = '<div data-animate="fade-up" id="b"></div>';
		const el = document.querySelector<HTMLElement>('#b')!;
		el.getBoundingClientRect = () => rect(5000, 5100);
		initAnimate();
		expect(el.classList.contains('in-view')).toBe(false);
	});
});

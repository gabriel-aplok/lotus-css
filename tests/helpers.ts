import { vi } from 'vitest';

/** jsdom has no matchMedia; stub it before a module reads it. */
export function mockMatchMedia(opts: { prefersDark?: boolean; reducedMotion?: boolean } = {}): void {
	const { prefersDark = false, reducedMotion = false } = opts;
	window.matchMedia = vi.fn().mockImplementation((query: string) => ({
		matches:
			query === '(prefers-color-scheme: dark)'
				? prefersDark
				: query === '(prefers-reduced-motion: reduce)'
					? reducedMotion
					: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})) as unknown as typeof window.matchMedia;
}

/** jsdom lacks IntersectionObserver; provide an inert class. */
export function stubIntersectionObserver(): void {
	class MockIntersectionObserver implements IntersectionObserver {
		readonly root = null;
		readonly rootMargin = '';
		readonly scrollMargin = '';
		readonly thresholds: number[] = [];
		observe(): void {}
		unobserve(): void {}
		disconnect(): void {}
		takeRecords(): IntersectionObserverEntry[] {
			return [];
		}
	}
	vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
}

/** A geometry stub for getBoundingClientRect. */
export function rect(top: number, bottom: number, left = 0, width = 100): DOMRect {
	return {
		top,
		bottom,
		left,
		right: left + width,
		width,
		height: bottom - top,
		x: left,
		y: top,
		toJSON: () => ({}),
	} as DOMRect;
}

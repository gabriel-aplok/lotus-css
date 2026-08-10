import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initCarousels } from '../js/carousel';

describe('carousel', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<div class="carousel" data-carousel>
				<button data-carousel-prev>prev</button>
				<div class="carousel-track" data-carousel-track></div>
				<button data-carousel-next>next</button>
			</div>
		`;
		initCarousels();
	});

	it('scrolls forward on next', () => {
		const track = document.querySelector<HTMLElement>('[data-carousel-track]')!;
		const scrollBy = vi.fn();
		track.scrollBy = scrollBy;
		(document.querySelector('[data-carousel-next]') as HTMLElement).click();
		expect(scrollBy).toHaveBeenCalled();
		expect(scrollBy.mock.calls[0][0].left).toBeGreaterThan(0);
	});

	it('scrolls backward on prev', () => {
		const track = document.querySelector<HTMLElement>('[data-carousel-track]')!;
		const scrollBy = vi.fn();
		track.scrollBy = scrollBy;
		(document.querySelector('[data-carousel-prev]') as HTMLElement).click();
		expect(scrollBy.mock.calls[0][0].left).toBeLessThan(0);
	});

	it('scrolls vertically on a vertical carousel', () => {
		document.body.innerHTML = `
			<div class="carousel is-vertical" data-carousel>
				<button data-carousel-prev>prev</button>
				<div class="carousel-track" data-carousel-track></div>
				<button data-carousel-next>next</button>
			</div>
		`;
		initCarousels();
		const track = document.querySelector<HTMLElement>('[data-carousel-track]')!;
		const scrollBy = vi.fn();
		track.scrollBy = scrollBy;
		(document.querySelector('[data-carousel-next]') as HTMLElement).click();
		expect(scrollBy).toHaveBeenCalled();
		expect(scrollBy.mock.calls[0][0].top).toBeGreaterThan(0);
		expect(scrollBy.mock.calls[0][0].left).toBeUndefined();
	});
});

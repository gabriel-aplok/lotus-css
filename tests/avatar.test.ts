import { beforeEach, describe, expect, it } from 'vitest';
import { initAvatars } from '../js/avatar';

describe('avatars', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	function imgFixture(attrs = ''): HTMLImageElement {
		document.body.innerHTML = `<span class="avatar">G<img src="x.png" alt="G" ${attrs}></span>`;
		return document.querySelector<HTMLImageElement>('.avatar img')!;
	}

	it('hides images that already failed to load', () => {
		const img = imgFixture();
		Object.defineProperty(img, 'complete', { value: true });
		Object.defineProperty(img, 'naturalWidth', { value: 0 });
		initAvatars();
		expect(img.hidden).toBe(true);
	});

	it('mirrors alt onto the avatar when hiding a broken image', () => {
		const img = imgFixture();
		Object.defineProperty(img, 'complete', { value: true });
		Object.defineProperty(img, 'naturalWidth', { value: 0 });
		initAvatars();
		expect(img.parentElement!.getAttribute('title')).toBe('G');
	});

	it('keeps loaded images visible', () => {
		const img = imgFixture();
		Object.defineProperty(img, 'complete', { value: true });
		Object.defineProperty(img, 'naturalWidth', { value: 120 });
		initAvatars();
		expect(img.hidden).toBe(false);
	});

	it('hides an image when it errors later', () => {
		const img = imgFixture();
		initAvatars();
		img.dispatchEvent(new Event('error'));
		expect(img.hidden).toBe(true);
	});

	it('only hides images inside .avatar', () => {
		document.body.innerHTML = '<img src="x.png" alt="plain">';
		const img = document.querySelector('img')!;
		Object.defineProperty(img, 'complete', { value: true });
		Object.defineProperty(img, 'naturalWidth', { value: 0 });
		initAvatars();
		expect(img.hidden).toBe(false);
	});
});

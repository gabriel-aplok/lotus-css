// Carousel: scroll-snap track with optional prev/next buttons.
export function initCarousels(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
		const track = carousel.querySelector<HTMLElement>('[data-carousel-track]');
		if (!track) return;

		// Vertical carousels (.is-vertical) scroll along the y axis.
		const vertical = carousel.classList.contains('is-vertical');

		const scroll = (direction: 1 | -1) => {
			const size = vertical ? track.clientHeight : track.clientWidth;
			const amount = Math.max(size * 0.8, 200);
			track.scrollBy(vertical ? { top: direction * amount, behavior: 'smooth' } : { left: direction * amount, behavior: 'smooth' });
		};

		carousel.querySelectorAll<HTMLElement>('[data-carousel-prev]').forEach((btn) => {
			btn.addEventListener('click', () => scroll(-1));
		});
		carousel.querySelectorAll<HTMLElement>('[data-carousel-next]').forEach((btn) => {
			btn.addEventListener('click', () => scroll(1));
		});
	});
}

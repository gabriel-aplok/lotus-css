// Carousel: scroll-snap track with optional prev/next buttons.
export function initCarousels(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
		const track = carousel.querySelector<HTMLElement>('[data-carousel-track]');
		if (!track) return;

		const scroll = (direction: 1 | -1) => {
			const amount = Math.max(track.clientWidth * 0.8, 200);
			track.scrollBy({ left: direction * amount, behavior: 'smooth' });
		};

		carousel.querySelectorAll<HTMLElement>('[data-carousel-prev]').forEach((btn) => {
			btn.addEventListener('click', () => scroll(-1));
		});
		carousel.querySelectorAll<HTMLElement>('[data-carousel-next]').forEach((btn) => {
			btn.addEventListener('click', () => scroll(1));
		});
	});
}

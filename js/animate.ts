// Animations — scroll reveals via [data-animate]; respects prefers-reduced-motion.

let observer: IntersectionObserver | null = null;

export function initAnimate(root: ParentNode = document): void {
	document.documentElement.classList.add('js');

	const items = root.querySelectorAll<HTMLElement>('[data-animate]');
	if (!items.length) return;

	// Per-element stagger: data-animate-delay="150" -> --animate-delay: 150ms.
	items.forEach((el) => {
		const delay = el.dataset.animateDelay;
		if (delay) el.style.setProperty('--animate-delay', `${delay}ms`);
	});

	// Reduced motion, or no IntersectionObserver: show everything immediately.
	if (
		typeof IntersectionObserver === 'undefined' ||
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		items.forEach((el) => el.classList.add('in-view'));
		return;
	}

	// Reveal above-the-fold content synchronously so it never flashes hidden.
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	items.forEach((el) => {
		const rect = el.getBoundingClientRect();
		if (rect.top < viewportHeight && rect.bottom > 0) {
			el.classList.add('in-view');
		}
	});

	observer ??= new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					observer?.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
	);

	items.forEach((el) => {
		if (!el.classList.contains('in-view')) observer!.observe(el);
	});
}

/** Run a DOM update inside a View Transition when supported, else sync. */
export function viewTransition(update: () => void): void {
	const doc = document as Document & {
		startViewTransition?: (cb: () => void) => { finished: Promise<void> };
	};
	if (doc.startViewTransition) {
		doc.startViewTransition(update);
	} else {
		update();
	}
}

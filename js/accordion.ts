// Accordion: exclusive <details> groups.
export function initAccordions(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-accordion]').forEach((group) => {
		const items = group.querySelectorAll<HTMLElement>('[data-accordion-item]');
		items.forEach((item) => {
			item.addEventListener('toggle', () => {
				if (!item.hasAttribute('open')) return;
				items.forEach((other) => {
					if (other !== item && other.hasAttribute('open')) other.removeAttribute('open');
				});
			});
		});
	});
}

// Accordions: exclusive by default, opt-in multiple, honours data-disabled.
export function initAccordions(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-accordion]').forEach((group) => {
		const multiple = group.hasAttribute('data-accordion-multiple');
		const items = group.querySelectorAll<HTMLElement>('[data-accordion-item]');

		// Exclusive groups: reconcile markup that opens several items at once.
		if (!multiple) {
			const opened = [...items].filter((item) => item.hasAttribute('open'));
			opened.slice(1).forEach((item) => item.removeAttribute('open'));
		}

		items.forEach((item) => {
			item.addEventListener('toggle', () => {
				if (item.hasAttribute('data-disabled')) {
					// Locked items stay closed, even via keyboard.
					item.removeAttribute('open');
					return;
				}
				if (multiple || !item.hasAttribute('open')) return;
				items.forEach((other) => {
					if (other !== item && other.hasAttribute('open')) other.removeAttribute('open');
				});
			});
		});
	});
}

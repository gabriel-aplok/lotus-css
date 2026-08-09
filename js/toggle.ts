// Toggle buttons — flip aria-pressed; exclusive inside a .toggle-group.
export function initToggles(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('.toggle').forEach((btn) => {
		btn.addEventListener('click', () => {
			const group = btn.closest('.toggle-group');
			if (group) {
				group.querySelectorAll<HTMLElement>('.toggle').forEach((other) => {
					other.setAttribute('aria-pressed', String(other === btn));
				});
			} else {
				const pressed = btn.getAttribute('aria-pressed') === 'true';
				btn.setAttribute('aria-pressed', String(!pressed));
			}
		});
	});
}

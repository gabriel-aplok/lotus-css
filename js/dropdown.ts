// Dropdowns: <details class="dropdown"> closes on outside click.
export function initDropdowns(root: ParentNode = document): void {
	document.addEventListener('click', (event) => {
		const target = event.target as Node;
		root.querySelectorAll<HTMLElement>('.dropdown[open]').forEach((dd) => {
			if (!dd.contains(target)) dd.removeAttribute('open');
		});
	});
}

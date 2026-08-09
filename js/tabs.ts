// Tabs
export function initTabs(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-tabs]').forEach((tabs) => {
		const buttons = tabs.querySelectorAll<HTMLElement>('[data-tab]');

		const activate = (btn: HTMLElement) => {
			const target = btn.getAttribute('data-tab');
			buttons.forEach((b) => {
				const active = b === btn;
				b.classList.toggle('active', active);
				b.setAttribute('aria-selected', String(active));
			});
			root.querySelectorAll<HTMLElement>('[data-tab-panel]').forEach((panel) => {
				panel.hidden = panel.getAttribute('data-tab-panel') !== target;
			});
		};

		buttons.forEach((btn) => btn.addEventListener('click', () => activate(btn)));

		// Establish the initial state: honour an .active button, else the first.
		const initial = [...buttons].find((b) => b.classList.contains('active')) || buttons[0];
		if (initial) activate(initial);
	});
}

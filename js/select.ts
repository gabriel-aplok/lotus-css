// Table row selection: a header checkbox ([data-select-all]) drives the row
// checkboxes ([data-select-item]) inside the same table. Rows gain
// data-state="selected" while checked, and the header reflects all/some/none
// through checked + indeterminate.
export function initTableSelect(root: ParentNode = document): void {
	root.querySelectorAll<HTMLInputElement>('[data-select-all]').forEach((toggle) => {
		const table = toggle.closest('table');
		if (!table) return;

		const items = () => [...table.querySelectorAll<HTMLInputElement>('[data-select-item]')];

		const refresh = () => {
			const list = items();
			const checked = list.filter((item) => item.checked).length;
			toggle.checked = checked > 0 && checked === list.length;
			toggle.indeterminate = checked > 0 && checked < list.length;
			list.forEach((item) => {
				const row = item.closest('tr');
				if (item.checked) {
					row?.setAttribute('data-state', 'selected');
				} else {
					row?.removeAttribute('data-state');
				}
			});
		};

		toggle.addEventListener('change', () => {
			items().forEach((item) => {
				item.checked = toggle.checked;
			});
			refresh();
		});

		items().forEach((item) => {
			item.addEventListener('change', refresh);
		});

		refresh();
	});
}

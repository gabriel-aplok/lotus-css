import { describe, expect, it, beforeEach } from 'vitest';
import { initTableSelect } from '../js/select';

const TABLE = `
	<table>
		<thead>
			<tr>
				<th><input type="checkbox" data-select-all aria-label="Select all"></th>
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input type="checkbox" data-select-item aria-label="Row 1"></td>
				<td>One</td>
			</tr>
			<tr>
				<td><input type="checkbox" data-select-item aria-label="Row 2"></td>
				<td>Two</td>
			</tr>
			<tr>
				<td><input type="checkbox" data-select-item aria-label="Row 3" checked></td>
				<td>Three</td>
			</tr>
		</tbody>
	</table>
`;

function inputs(): HTMLInputElement[] {
	return [...document.querySelectorAll<HTMLInputElement>('[data-select-item]')];
}

function rows(): HTMLTableRowElement[] {
	return [...document.querySelectorAll<HTMLTableRowElement>('tbody tr')];
}

describe('table select', () => {
	beforeEach(() => {
		document.body.innerHTML = TABLE;
		initTableSelect();
	});

	it('marks pre-checked rows as selected on init', () => {
		expect(rows()[2].getAttribute('data-state')).toBe('selected');
		expect(rows()[0].hasAttribute('data-state')).toBe(false);
	});

	it('shows indeterminate when some rows are checked', () => {
		const all = document.querySelector<HTMLInputElement>('[data-select-all]')!;
		expect(all.indeterminate).toBe(true);
		expect(all.checked).toBe(false);
	});

	it('selects every row when the header checkbox is checked', () => {
		const all = document.querySelector<HTMLInputElement>('[data-select-all]')!;
		all.checked = true;
		all.dispatchEvent(new Event('change'));
		expect(inputs().every((input) => input.checked)).toBe(true);
		expect(rows().every((row) => row.getAttribute('data-state') === 'selected')).toBe(true);
		expect(all.indeterminate).toBe(false);
	});

	it('unchecks the header when the last row is deselected', () => {
		const all = document.querySelector<HTMLInputElement>('[data-select-all]')!;
		all.checked = true;
		all.dispatchEvent(new Event('change'));
		inputs()[2].checked = false;
		inputs()[2].dispatchEvent(new Event('change'));
		expect(all.indeterminate).toBe(true);
		expect(all.checked).toBe(false);
		expect(rows()[2].hasAttribute('data-state')).toBe(false);
	});

	it('clears everything when the header is unchecked', () => {
		const all = document.querySelector<HTMLInputElement>('[data-select-all]')!;
		all.checked = true;
		all.dispatchEvent(new Event('change'));
		all.checked = false;
		all.dispatchEvent(new Event('change'));
		expect(inputs().every((input) => !input.checked)).toBe(true);
		expect(rows().every((row) => !row.hasAttribute('data-state'))).toBe(true);
	});
});

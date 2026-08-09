import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initSheets } from '../js/sheet';

describe('sheets', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<button data-sheet-open="s1">open</button>
			<dialog class="sheet" id="s1">
				<button data-sheet-close>close</button>
			</dialog>
		`;
		initSheets();
	});

	it('opens and closes via data attributes', () => {
		const dlg = document.querySelector<HTMLDialogElement>('#s1')!;
		const showModal = vi.fn();
		const close = vi.fn();
		dlg.showModal = showModal;
		dlg.close = close;

		(document.querySelector('[data-sheet-open]') as HTMLElement).click();
		expect(showModal).toHaveBeenCalled();

		(document.querySelector('[data-sheet-close]') as HTMLElement).click();
		expect(close).toHaveBeenCalled();
	});
});

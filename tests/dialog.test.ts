import { beforeEach, describe, expect, it, vi } from 'vitest';
import { closeDialog, initDialogs, openDialog } from '../js/dialog';

describe('dialog', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('openDialog calls showModal when available', () => {
		const dlg = document.createElement('dialog');
		const showModal = vi.fn();
		dlg.showModal = showModal;
		openDialog(dlg);
		expect(showModal).toHaveBeenCalled();
	});

	it('openDialog falls back to the open attribute', () => {
		const dlg = document.createElement('dialog');
		(dlg as unknown as { showModal?: unknown }).showModal = undefined;
		openDialog(dlg);
		expect(dlg.hasAttribute('open')).toBe(true);
	});

	it('closeDialog calls close when available', () => {
		const dlg = document.createElement('dialog');
		const close = vi.fn();
		dlg.close = close;
		closeDialog(dlg);
		expect(close).toHaveBeenCalled();
	});

	it('wires data-dialog-open and data-dialog-close', () => {
		document.body.innerHTML = `
			<button data-dialog-open="d1">open</button>
			<dialog id="d1"><button data-dialog-close>close</button></dialog>
		`;
		const dlg = document.querySelector<HTMLDialogElement>('#d1')!;
		const showModal = vi.fn();
		dlg.showModal = showModal;

		initDialogs();
		(document.querySelector('[data-dialog-open]') as HTMLElement).click();
		expect(showModal).toHaveBeenCalled();

		const close = vi.fn();
		dlg.close = close;
		(document.querySelector('[data-dialog-close]') as HTMLElement).click();
		expect(close).toHaveBeenCalled();
	});

	it('closes when the backdrop itself is clicked', () => {
		document.body.innerHTML = '<dialog id="d1">content</dialog>';
		const dlg = document.querySelector<HTMLDialogElement>('#d1')!;
		const close = vi.fn();
		dlg.close = close;
		initDialogs();
		dlg.click();
		expect(close).toHaveBeenCalled();
	});
});

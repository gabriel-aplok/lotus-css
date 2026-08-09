// Sheets (side drawers) — native <dialog class="sheet"> sliding in from an edge.
import { openDialog, closeDialog } from './dialog';

export function initSheets(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-sheet-open]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-sheet-open');
			openDialog(id ? (document.getElementById(id) as HTMLDialogElement | null) : null);
		});
	});

	root.querySelectorAll<HTMLElement>('[data-sheet-close]').forEach((btn) => {
		btn.addEventListener('click', () => closeDialog(btn.closest('dialog')));
	});
}

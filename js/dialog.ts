// Dialogs (native <dialog>)

/** Open a <dialog> as a modal, falling back to the open attribute. */
export function openDialog(dialog: HTMLDialogElement | null): void {
	if (!dialog) return;
	if (typeof dialog.showModal === 'function') dialog.showModal();
	else dialog.setAttribute('open', '');
}

/** Close a <dialog>, falling back to removing the open attribute. */
export function closeDialog(dialog: HTMLDialogElement | null): void {
	if (!dialog) return;
	if (typeof dialog.close === 'function') dialog.close();
	else dialog.removeAttribute('open');
}

/** Bind [data-dialog-open]/[data-dialog-close] buttons and backdrop click-to-close.
 * Dialogs marked data-dialog-static keep the alert-dialog semantics: they only
 * close via an explicit data-dialog-close button (Esc is blocked too). */
export function initDialogs(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-dialog-open]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-dialog-open');
			openDialog(id ? (document.getElementById(id) as HTMLDialogElement | null) : null);
		});
	});

	root.querySelectorAll<HTMLElement>('[data-dialog-close]').forEach((btn) => {
		btn.addEventListener('click', () => closeDialog(btn.closest('dialog')));
	});

	root.querySelectorAll<HTMLDialogElement>('dialog').forEach((dlg) => {
		const isStatic = dlg.hasAttribute('data-dialog-static');

		if (!isStatic) {
			dlg.addEventListener('click', (event) => {
				if (event.target === dlg) closeDialog(dlg);
			});
		}

		// Native <dialog> fires cancel before dismissing on Esc. Prevent it so a
		// static dialog forces an explicit Cancel/Action response.
		dlg.addEventListener('cancel', (event) => {
			if (isStatic) event.preventDefault();
		});
	});
}

// Sheets & drawers (native <dialog class="sheet">): panels sliding in from an
// edge. Extends the dialog API with drawer extras:
//   - data-sheet-snaps on the <dialog> + a [data-sheet-handle] child enable
//     drag-to-resize between preset heights (vertical sheets only).
//   - Snap values: rem strings ("24rem"), viewport fractions (0 < n <= 1),
//     or pixel numbers (> 1). Space or comma separated.
//
// Note: snap-enabled sheets start at their first snap point when opened via
// openSheet()/[data-sheet-open]. Opening one with the generic openDialog()
// skips the first-snap height and uses the CSS height instead.
import { openDialog, closeDialog } from './dialog';

/** Resolve a snap value to pixels. Numbers 0–1 are viewport fractions,
 * numbers > 1 are pixels, rem strings resolve against the root font size. */	/** Height while dragging: bottom sheets grow on an upward drag (negative
	 * delta), top sheets on a downward drag. Clamped to the snap range. */
	export function clampSnapHeight(start: number, delta: number, min: number, max: number, isTop: boolean): number {
		const height = start + (isTop ? delta : -delta);
		return Math.min(Math.max(height, min), max);
	}

	export function resolveSnapPoint(value: string | number, viewportHeight: number, rootFontSize: number): number {
	if (typeof value === 'number') {
		return value > 0 && value <= 1 ? Math.round(value * viewportHeight) : value;
	}
	const trimmed = value.trim();
	const rem = /^(-?[\d.]+)rem$/.exec(trimmed);
	if (rem) return parseFloat(rem[1]) * rootFontSize;
	const num = parseFloat(trimmed);
	if (!Number.isNaN(num)) {
		return num > 0 && num <= 1 ? Math.round(num * viewportHeight) : num;
	}
	return viewportHeight;
}

/** Open a sheet, starting at its first snap point when one is configured. */
export function openSheet(dialog: HTMLDialogElement | null): void {
	if (!dialog) return;
	const snaps = dialog.getAttribute('data-sheet-snaps');
	const side = dialog.dataset.side;
	if (snaps && side !== 'left' && side !== 'right') {
		const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
		const points = snaps
			.split(/[\s,]+/)
			.map((value) => resolveSnapPoint(value, document.documentElement.clientHeight, rootFontSize))
			.filter((point) => point > 0);
		if (points.length > 0) {
			dialog.style.height = `${points[0]}px`;
			dialog.toggleAttribute('data-expanded', points[0] >= Math.max(...points));
		}
	}
	openDialog(dialog);
}

/** Wire drag + keyboard resize for a snap-enabled vertical sheet. */
function initSnapPoints(dialog: HTMLDialogElement): void {
	const snapsAttr = dialog.getAttribute('data-sheet-snaps');
	const handle = dialog.querySelector<HTMLElement>('[data-sheet-handle]');
	if (!snapsAttr || !handle) return;
	const side = dialog.dataset.side;
	if (side !== 'bottom' && side !== 'top') return; // snap points are vertical-only

	const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
	const points = snapsAttr
		.split(/[\s,]+/)
		.map((value) => resolveSnapPoint(value, document.documentElement.clientHeight, rootFontSize))
		.filter((point) => point > 0);
	if (points.length === 0) return;

	const min = Math.min(...points);
	const max = Math.max(...points);
	const isTop = side === 'top'; // top sheets grow downward, so invert the drag
	const heightOf = (): number => dialog.offsetHeight || parseFloat(dialog.style.height || '0') || min;

	const apply = (height: number): void => {
		const clamped = Math.min(Math.max(height, min), max);
		dialog.style.height = `${clamped}px`;
		dialog.toggleAttribute('data-expanded', clamped >= max);
		handle.setAttribute('aria-valuenow', String(clamped));
	};

	const nearest = (height: number): number =>
		points.reduce((best, point) => (Math.abs(point - height) < Math.abs(best - height) ? point : best));

	let dragging = false;
	let startY = 0;
	let startH = 0;

	const onPointerDown = (event: PointerEvent): void => {
		dragging = true;
		startY = event.clientY;
		startH = heightOf();
		handle.setPointerCapture?.(event.pointerId);
		handle.setAttribute('data-dragging', '');
		event.preventDefault();
	};

	const onPointerMove = (event: PointerEvent): void => {
		if (!dragging) return;
		apply(clampSnapHeight(startH, event.clientY - startY, min, max, isTop));
	};

	const endDrag = (event: PointerEvent): void => {
		if (!dragging) return;
		dragging = false;
		apply(nearest(heightOf()));
		handle.removeAttribute('data-dragging');
		handle.releasePointerCapture?.(event.pointerId);
	};

	// Expose the resize control to assistive tech: the handle acts as a
	// vertical slider between the smallest and largest snap points.
	handle.setAttribute('aria-orientation', 'vertical');
	handle.setAttribute('aria-valuemin', String(min));
	handle.setAttribute('aria-valuemax', String(max));
	handle.setAttribute('aria-valuenow', String(dialog.style.height ? parseFloat(dialog.style.height) : min));

	handle.addEventListener('pointerdown', onPointerDown);
	handle.addEventListener('pointermove', onPointerMove);
	handle.addEventListener('pointerup', endDrag);
	handle.addEventListener('pointercancel', endDrag);

	// Keyboard resizing on the (focusable) handle.
	handle.addEventListener('keydown', (event) => {
		if (event.key === 'PageUp') apply(max);
		else if (event.key === 'PageDown') apply(min);
		else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			const sorted = [...points].sort((a, b) => a - b);
			const index = sorted.indexOf(nearest(heightOf()));
			const next = event.key === 'ArrowUp'
				? sorted[Math.min(index + 1, sorted.length - 1)]
				: sorted[Math.max(index - 1, 0)];
			apply(next);
		} else {
			return;
		}
		event.preventDefault();
	});
}

/** Bind [data-sheet-open]/[data-sheet-close] buttons and snap points. */
export function initSheets(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-sheet-open]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-sheet-open');
			openSheet(id ? (document.getElementById(id) as HTMLDialogElement | null) : null);
		});
	});

	root.querySelectorAll<HTMLElement>('[data-sheet-close]').forEach((btn) => {
		btn.addEventListener('click', () => closeDialog(btn.closest('dialog')));
	});

	root.querySelectorAll<HTMLDialogElement>('dialog.sheet[data-sheet-snaps]').forEach(initSnapPoints);
}

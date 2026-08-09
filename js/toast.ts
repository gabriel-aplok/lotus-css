// Toast notifications — dependency-free; stacked in a created container.
export type ToastType = 'default' | 'success' | 'warning' | 'destructive';

export interface ToastOptions {
	type?: ToastType;
	title?: string;
	duration?: number; // ms; 0 keeps it until dismissed
	onDismiss?: (item: HTMLElement) => void;
}

let stack: HTMLElement | null = null;

function getStack(): HTMLElement {
	if (stack && stack.isConnected) return stack;
	let el = document.querySelector<HTMLElement>('[data-toast-stack]');
	if (!el) {
		el = document.createElement('div');
		el.className = 'toast-stack';
		el.setAttribute('data-toast-stack', '');
		document.body.appendChild(el);
	}
	stack = el;
	return el;
}

/** Show a toast and return its element. */
export function toast(message: string, options: ToastOptions = {}): HTMLElement {
	const { type = 'default', title, duration = 4000, onDismiss } = options;
	const host = getStack();

	const item = document.createElement('div');
	item.className = `toast-item${type !== 'default' ? ` ${type}` : ''}`;
	item.setAttribute('role', 'status');
	item.setAttribute('aria-live', 'polite');

	if (title) {
		const titleEl = document.createElement('div');
		titleEl.className = 'toast-title';
		titleEl.textContent = title;
		item.appendChild(titleEl);
	}

	const body = document.createElement('div');
	body.className = 'toast-body';
	body.textContent = message;
	item.appendChild(body);

	const dismissBtn = document.createElement('button');
	dismissBtn.className = 'toast-close';
	dismissBtn.type = 'button';
	dismissBtn.setAttribute('aria-label', 'Dismiss');
	dismissBtn.addEventListener('click', () => dismissToast(item, onDismiss));
	item.appendChild(dismissBtn);

	host.appendChild(item);
	requestAnimationFrame(() => item.classList.add('is-in'));

	if (duration > 0) {
		setTimeout(() => dismissToast(item, onDismiss), duration);
	}
	return item;
}

/** Dismiss a toast (triggers the leave transition, then removes it). */
export function dismissToast(item: HTMLElement, onDismiss?: (item: HTMLElement) => void): void {
	if (!item.isConnected) return;
	item.classList.remove('is-in');
	item.addEventListener('transitionend', () => item.remove(), { once: true });
	setTimeout(() => item.remove(), 400); // safety net (e.g. reduced motion)
	onDismiss?.(item);
}

/** Bind declarative toasts: buttons with data-toast + data-toast-message/-title/-type. */
export function initToasts(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-toast]').forEach((btn) => {
		btn.addEventListener('click', () => {
			toast(
				btn.getAttribute('data-toast-message') || btn.getAttribute('data-toast') || 'Notification',
				{
					type: (btn.getAttribute('data-toast-type') as ToastType | null) || 'default',
					title: btn.getAttribute('data-toast-title') || undefined,
				},
			);
		});
	});
}

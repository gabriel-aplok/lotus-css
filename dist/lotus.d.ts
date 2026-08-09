/** Type declarations for lotus.js: the optional JS enhancements for LOTUS.css. */

export type Theme = 'light' | 'dark' | 'auto';

export type ToastType = 'default' | 'success' | 'warning' | 'destructive';

export interface ToastOptions {
	type?: ToastType;
	title?: string;
	/** Duration in ms; 0 keeps the toast until dismissed. */
	duration?: number;
	onDismiss?: (item: HTMLElement) => void;
}

export const version: string;

/** Initialise every LOTUS enhancement on the given subtree (default: document). */
export function init(root?: ParentNode | Document): void;

// --- theme -----------------------------------------------------------------
export function currentTheme(): Theme;
export function resolvedTheme(): 'light' | 'dark';
export function setTheme(theme: Theme, persist?: boolean): void;
export function toggleTheme(): Theme;
export function initTheme(root?: ParentNode): void;

// --- toast -----------------------------------------------------------------
export function toast(message: string, options?: ToastOptions): HTMLElement;
export function dismissToast(item: HTMLElement, onDismiss?: (item: HTMLElement) => void): void;
export function initToasts(root?: ParentNode): void;

// --- dialog ----------------------------------------------------------------
export function openDialog(dialog: HTMLDialogElement | null): void;
export function closeDialog(dialog: HTMLDialogElement | null): void;
export function initDialogs(root?: ParentNode): void;

// --- components ------------------------------------------------------------
export function initTabs(root?: ParentNode): void;
export function initAccordions(root?: ParentNode): void;
export function initDropdowns(root?: ParentNode): void;
export function initCarousels(root?: ParentNode): void;
export function initPopovers(root?: ParentNode): void;
export function initSheets(root?: ParentNode): void;

// --- code ------------------------------------------------------------------
export function initCopy(root?: ParentNode): void;
export function initHighlight(root?: ParentNode): void;

// --- animation -------------------------------------------------------------
export function initAnimate(root?: ParentNode): void;
export function viewTransition(update: () => void): void;

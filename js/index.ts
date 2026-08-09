// lotus.js: optional JS enhancements for LOTUS.css (dependency-free).
// Opt-in via data attributes; set data-lotus-no-init on <html> to disable
// automatic initialisation.

import { toast, dismissToast, initToasts, type ToastOptions, type ToastType } from './toast';
import {
	currentTheme,
	resolvedTheme,
	setTheme,
	toggleTheme,
	initTheme,
	type Theme,
} from './theme';
import { openDialog, closeDialog, initDialogs } from './dialog';
import { initTabs } from './tabs';
import { initAccordions } from './accordion';
import { initDropdowns } from './dropdown';
import { initCarousels } from './carousel';
import { initPopovers } from './popover';
import { initSheets } from './sheet';
import { initToggles } from './toggle';
import { initCopy, initHighlight } from './code';
import { initAvatars } from './avatar';
import { initAnimate, viewTransition } from './animate';

export {
	toast,
	dismissToast,
	initToasts,
	currentTheme,
	resolvedTheme,
	setTheme,
	toggleTheme,
	initTheme,
	openDialog,
	closeDialog,
	initDialogs,
	initTabs,
	initAccordions,
	initDropdowns,
	initCarousels,
	initPopovers,
	initSheets,
	initToggles,
	initCopy,
	initHighlight,
	initAvatars,
	initAnimate,
	viewTransition,
	type ToastOptions,
	type ToastType,
	type Theme,
};

export const version = '0.5.0';

/** Initialise every LOTUS enhancement on the given subtree (default: document). */
export function init(root: ParentNode | Document = document): void {
	initTheme(root);
	initDialogs(root);
	initSheets(root);
	initTabs(root);
	initAccordions(root);
	initDropdowns(root);
	initCarousels(root);
	initPopovers(root);
	initToggles(root);
	initCopy(root);
	initHighlight(root);
	initAvatars(root);
	initAnimate(root);
	initToasts(root);
}

// Auto-initialise unless opted out. Script-tag users get everything wired up
// with zero configuration.
if (!document.documentElement.hasAttribute('data-lotus-no-init')) {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => init(), { once: true });
	} else {
		init();
	}
}

// Popover: positions [data-popover] panels, flipping when they'd overflow.
export function initPopovers(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-popover-trigger]').forEach((trigger) => {
		const id = trigger.getAttribute('data-popover-trigger');
		const panel = id ? document.getElementById(id) : null;
		if (!panel) return;

		trigger.addEventListener('click', (event) => {
			event.stopPropagation();
			if (panel.classList.contains('open')) {
				closePopover(panel);
				return;
			}
			positionPopover(trigger, panel);
			panel.classList.add('open');
			document.addEventListener(
				'click',
				(outside) => {
					if (!panel.contains(outside.target as Node)) closePopover(panel);
				},
				{ once: true },
			);
		});
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			root.querySelectorAll<HTMLElement>('.popover.open').forEach(closePopover);
		}
	});
}

function positionPopover(trigger: HTMLElement, panel: HTMLElement): void {
	const rect = trigger.getBoundingClientRect();
	const panelRect = panel.getBoundingClientRect();
	// Gap between the trigger and the panel. Reads the design-system --space-2
	// token (0.8rem) so positioning stays in sync with the CSS gap; falls back
	// to the historical 8px when the token is unavailable (e.g. in jsdom).
	const gap = readTokenPx('--space-2') ?? 8;
	let top = rect.bottom + gap;
	let left = rect.left;
	if (top + panelRect.height > window.innerHeight) {
		top = Math.max(gap, rect.top - panelRect.height - gap);
	}
	if (left + panelRect.width > window.innerWidth) {
		left = Math.max(gap, window.innerWidth - panelRect.width - gap);
	}
	panel.style.top = `${top}px`;
	panel.style.left = `${left}px`;
}

/** Resolve a CSS length token (e.g. `--space-2: 0.8rem`) to pixels, or null. */
function readTokenPx(name: string): number | null {
	const style = getComputedStyle(document.documentElement);
	const raw = style.getPropertyValue(name).trim();
	const value = parseFloat(raw);
	if (!Number.isFinite(value)) return null;
	return raw.endsWith('rem') ? value * parseFloat(style.fontSize) : value;
}

function closePopover(panel: HTMLElement): void {
	panel.classList.remove('open');
}

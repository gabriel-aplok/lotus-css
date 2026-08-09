// Theme management — defaults to OS; manual .dark/.light persisted to localStorage.
export type Theme = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'lotus-theme';

function storedTheme(): Theme | null {
	const value = localStorage.getItem(STORAGE_KEY);
	return value === 'light' || value === 'dark' || value === 'auto' ? value : null;
}

function systemPrefersDark(): boolean {
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** The active theme class, or 'auto' when neither .dark nor .light is set. */
export function currentTheme(): Theme {
	const root = document.documentElement;
	if (root.classList.contains('dark')) return 'dark';
	if (root.classList.contains('light')) return 'light';
	return 'auto';
}

/** The theme in effect ('auto' resolved against the OS preference). */
export function resolvedTheme(): 'light' | 'dark' {
	const theme = currentTheme();
	return theme === 'auto' ? (systemPrefersDark() ? 'dark' : 'light') : theme;
}

/** Set the theme, optionally persisting it to localStorage. */
export function setTheme(theme: Theme, persist = true): void {
	const root = document.documentElement;
	root.classList.toggle('dark', theme === 'dark');
	root.classList.toggle('light', theme === 'light');
	if (persist) {
		if (theme === 'auto') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, theme);
	}
	document.dispatchEvent(
		new CustomEvent('lotus:themechange', { detail: { theme, resolved: resolvedTheme() } }),
	);
}

/** Flip between light and dark, following the OS preference on the first call. */
export function toggleTheme(): Theme {
	const next: Theme = resolvedTheme() === 'dark' ? 'light' : 'dark';
	setTheme(next);
	return next;
}

/** Bind [data-theme-toggle] buttons and apply any stored preference. */
export function initTheme(root: ParentNode = document): void {
	const stored = storedTheme();
	if (stored) setTheme(stored, false);

	root.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
		btn.addEventListener('click', () => toggleTheme());
	});
}

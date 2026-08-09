// Code blocks: copy buttons + auto-highlighting (hljs optional, dependency-free).

const COPY_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

async function copyText(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
		return;
	} catch {
		// Fallback for non-secure contexts / older browsers.
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
	}
}

function addCopyButton(pre: HTMLElement): void {
	if (pre.classList.contains('has-copy') || pre.hasAttribute('data-no-copy')) return;
	const code = pre.querySelector('code');
	if (!code) return;

	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'copy-button';
	btn.setAttribute('aria-label', 'Copy code');
	btn.innerHTML = COPY_ICON;
	btn.addEventListener('click', async () => {
		await copyText(code.innerText);
		btn.innerHTML = CHECK_ICON;
		btn.classList.add('copied');
		btn.setAttribute('aria-label', 'Copied');
		window.setTimeout(() => {
			btn.innerHTML = COPY_ICON;
			btn.classList.remove('copied');
			btn.setAttribute('aria-label', 'Copy code');
		}, 2000);
	});

	pre.classList.add('has-copy');
	pre.appendChild(btn);
}

/** Add copy buttons to every code block under root. */
export function initCopy(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('pre').forEach(addCopyButton);
}

/** Highlight code blocks with window.hljs when available. */
export function initHighlight(root: ParentNode = document): void {
	const hljs = (window as { hljs?: { highlightElement(el: HTMLElement): void } }).hljs;
	if (!hljs) return;
	root.querySelectorAll<HTMLElement>('pre code').forEach((el) => {
		if (el.classList.contains('hljs')) return;
		try {
			hljs.highlightElement(el);
		} catch {
			// Malformed input must never break the page.
		}
	});
}

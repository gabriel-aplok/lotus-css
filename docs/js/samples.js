// Single source of truth for every code sample on the docs site.
// Pages reference a sample with <pre data-sample="id"></pre> and
// renderSamples() fills the block from this map, so sample markup is
// never duplicated or hand-escaped inside HTML.

export const SAMPLES = {
	// ---- Landing page ---------------------------------------------------
	'quick-css': {
		filename: 'index.html',
		lang: 'html',
		code: '<link rel="stylesheet" href="https://unpkg.com/lotus-css">',
	},
	'quick-js': {
		filename: 'index.html',
		lang: 'html',
		code: '<script src="https://unpkg.com/lotus-css/dist/lotus.min.js" defer></script>',
	},
	'quick-npm': {
		filename: 'terminal',
		lang: 'bash',
		code: 'npm install lotus-css',
	},
	customize: {
		filename: 'your-theme.css',
		lang: 'css',
		code: `:root {
  --primary: #111111;          /* brand color */
  --background: #fafafa;       /* page background */
  --foreground: #18181b;       /* text color */
  --radius-md: 0.75rem;        /* border radius */
  --font-sans: "Inter", system-ui, sans-serif;
  --grid-max-width: 108rem;    /* container width */
}`,
	},

	// ---- Component demo -------------------------------------------------
	buttons: {
		filename: 'buttons.html',
		lang: 'html',
		code: `<button class="button primary">Primary</button>
<button class="button outline is-lg">Large outline</button>
<div class="grouped">…</div>`,
	},
	tabs: {
		filename: 'tabs.html',
		lang: 'html',
		code: `<div class="tabs" data-tabs>
  <button data-tab="tab1" class="active">Overview</button>
  <button data-tab="tab2">Settings</button>
</div>
<div data-tab-panel="tab1">…</div>
<div data-tab-panel="tab2" hidden>…</div>`,
	},
	cards: {
		filename: 'cards.html',
		lang: 'html',
		code: `<article class="card hover">
  <h3 class="card-title">Title</h3>
  <p>Body text…</p>
</article>`,
	},
	dialog: {
		filename: 'dialog.html',
		lang: 'html',
		code: `<button data-dialog-open="my-dialog">Open</button>
<dialog id="my-dialog">
  <button data-dialog-close>Close</button>
</dialog>`,
	},
	sheet: {
		filename: 'sheet.html',
		lang: 'html',
		code: `<button data-sheet-open="my-sheet">Open</button>
<dialog class="sheet" id="my-sheet" data-side="right">
  <button data-sheet-close>Close</button>
</dialog>`,
	},
	popover: {
		filename: 'popover.html',
		lang: 'html',
		code: `<button data-popover-trigger="menu">Open</button>
<div class="popover" id="menu">…</div>`,
	},
	toast: {
		filename: 'app.js',
		lang: 'js',
		code: `import { toast } from 'lotus-css/js';

toast('Saved', { type: 'success', title: 'Done' });`,
	},
	tooltip: {
		filename: 'tooltip.html',
		lang: 'html',
		code: `<button data-tooltip="Help text">Hover me</button>`,
	},
	accordion: {
		filename: 'accordion.html',
		lang: 'html',
		code: `<div data-accordion>
  <details data-accordion-item open>
    <summary>Question</summary>
    <p>Answer…</p>
  </details>
  <details data-accordion-item>
    <summary>Another question</summary>
    <p>Answer…</p>
  </details>
</div>

<!-- multiple:    <div data-accordion data-accordion-multiple> -->
<!-- locked item: <details data-accordion-item data-disabled> -->`,
	},
	'accordion-basic': {
		filename: 'accordion.html',
		lang: 'html',
		code: `<div data-accordion>
  <details data-accordion-item open>
    <summary>How do I reset my password?</summary>
    <p>Click "Forgot password" on the login page, enter your email and we will send you a reset link that expires in 24 hours.</p>
  </details>
  <details data-accordion-item>
    <summary>Can I change my subscription plan?</summary>
    <p>Yes. Upgrade or downgrade at any time from account settings, and the change applies from your next billing cycle.</p>
  </details>
  <details data-accordion-item>
    <summary>What payment methods do you accept?</summary>
    <p>All major credit cards, PayPal and bank transfers, all processed securely through our payment partners.</p>
  </details>
</div>`,
	},
	'accordion-multiple': {
		filename: 'accordion.html',
		lang: 'html',
		code: `<div data-accordion data-accordion-multiple>
  <details data-accordion-item open>
    <summary>Notification settings</summary>
    <p>Choose email alerts, push notifications, or turn both off for individual devices.</p>
  </details>
  <details data-accordion-item open>
    <summary>Privacy &amp; security</summary>
    <p>Enable two-factor authentication, review active sessions and manage connected devices.</p>
  </details>
  <details data-accordion-item>
    <summary>Billing &amp; subscription</summary>
    <p>View your plan, payment history and upcoming invoices, or update your payment method.</p>
  </details>
</div>`,
	},
	'accordion-disabled': {
		filename: 'accordion.html',
		lang: 'html',
		code: `<div data-accordion>
  <details data-accordion-item>
    <summary>How do I update my email address?</summary>
    <p>Change it in account settings. You will receive a verification email at the new address.</p>
  </details>
  <details data-accordion-item data-disabled>
    <summary>Premium feature information</summary>
    <p>This section is locked. Upgrade your plan to access this content.</p>
  </details>
  <details data-accordion-item>
    <summary>Where can I find my invoices?</summary>
    <p>All invoices live in the billing section, downloadable at any time.</p>
  </details>
</div>`,
	},
	'accordion-bordered': {
		filename: 'accordion.html',
		lang: 'html',
		code: `<!-- Bordered group: the container border and hairline dividers are the default. -->
<div data-accordion>
  <details data-accordion-item open>
    <summary>How does billing work?</summary>
    <p>Monthly and annual plans, charged at the start of each cycle. Cancel any time.</p>
  </details>
  <details data-accordion-item>
    <summary>Is my data secure?</summary>
    <p>Yes. End-to-end encryption, SOC 2 Type II compliance and regular third-party audits.</p>
  </details>
</div>

<!-- Flat alternative: skip the group and stack standalone items instead. -->
<details class="accordion" open>
  <summary>What integrations do you support?</summary>
  <p>500+ tools, plus a REST API and webhooks for custom integrations.</p>
</details>
<details class="accordion">
  <summary>Do you offer a free trial?</summary>
  <p>Yes, 14 days on every paid plan, no credit card required.</p>
</details>`,
	},
	carousel: {
		filename: 'carousel.html',
		lang: 'html',
		code: `<div class="carousel" data-carousel>
  <button data-carousel-prev>‹</button>
  <div class="carousel-track" data-carousel-track>
    <div class="carousel-item">…</div>
  </div>
  <button data-carousel-next>›</button>
</div>`,
	},
	form: {
		filename: 'form.html',
		lang: 'html',
		code: `<label for="name">Name</label>
<input id="name" type="text" placeholder="Ada Lovelace">
<select id="country"><option>…</option></select>
<textarea rows="3">…</textarea>`,
	},
	controls: {
		filename: 'controls.html',
		lang: 'html',
		code: `<label><input type="checkbox" checked> Checkbox</label>
<span class="switch">
  <input type="checkbox" checked>
  <span class="track"></span>
</span>
<input type="range" min="0" max="100" value="40">`,
	},
	toggle: {
		filename: 'toggle.html',
		lang: 'html',
		code: `<button class="toggle" aria-pressed="true">Bold</button>
<div class="toggle-group">
  <button class="toggle" aria-pressed="false">Week</button>
</div>`,
	},
	nav: {
		filename: 'nav.html',
		lang: 'html',
		code: `<nav class="nav">
  <div class="nav-left"><a class="brand" href="#">LOTUS</a></div>
  <div class="nav-right">
    <a href="#" aria-current="page">Home</a>
  </div>
</nav>`,
	},
	dropdown: {
		filename: 'dropdown.html',
		lang: 'html',
		code: `<details class="dropdown">
  <summary>Menu</summary>
  <div class="dropdown-menu">…</div>
</details>`,
	},
	alert: {
		filename: 'alert.html',
		lang: 'html',
		code: `<div class="alert success">
  <span class="alert-icon material-symbols-outlined" aria-hidden="true">check_circle</span>
  <div>
    <p class="alert-title">Success</p>
    <p class="alert-description">Everything went as planned.</p>
  </div>
</div>`,
	},
	'alert-basic': {
		filename: 'alert.html',
		lang: 'html',
		code: `<!-- Icon slot: any element works. This docs site uses the Material Symbols
     font; an inline <svg> or any icon you already ship works the same. -->
<div class="alert">
  <span class="alert-icon material-symbols-outlined" aria-hidden="true">check_circle</span>
  <div>
    <p class="alert-title">Account updated successfully</p>
    <p class="alert-description">Your profile information has been saved. Changes are reflected immediately.</p>
  </div>
</div>`,
	},
	'alert-destructive': {
		filename: 'alert.html',
		lang: 'html',
		code: `<div class="alert destructive">
  <span class="alert-icon material-symbols-outlined" aria-hidden="true">error</span>
  <div>
    <p class="alert-title">Payment failed</p>
    <p class="alert-description">Your payment could not be processed. Please check your payment method and try again.</p>
  </div>
</div>`,
	},
	'alert-action': {
		filename: 'alert.html',
		lang: 'html',
		code: `<div class="alert">
  <span class="alert-icon material-symbols-outlined" aria-hidden="true">info</span>
  <div>
    <p class="alert-title">Dark mode is now available</p>
    <p class="alert-description">Enable it under your profile settings to get started.</p>
  </div>
  <div class="alert-action">
    <button class="button outline">Enable</button>
  </div>
</div>`,
	},
	'alert-colors': {
		filename: 'alert.html',
		lang: 'html',
		code: `<!-- Custom colors: override the alert's design variables. Any color works;
     color-mix keeps the scheme theme-aware in light and dark mode. -->
<div class="alert" style="
  --alert-bg: color-mix(in oklab, oklch(0.87 0.13 75) 30%, var(--background));
  --alert-fg: color-mix(in oklab, oklch(0.45 0.12 75) 65%, var(--foreground));
  --alert-border: color-mix(in oklab, oklch(0.87 0.13 75) 45%, var(--border));">
  <span class="alert-icon material-symbols-outlined" aria-hidden="true">warning</span>
  <div>
    <p class="alert-title">Your subscription expires in 3 days</p>
    <p class="alert-description">Renew now to avoid an interruption in service.</p>
  </div>
</div>`,
	},
	badge: {
		filename: 'badge.html',
		lang: 'html',
		code: `<span class="badge success">Success</span>
<span class="avatar">G</span>`,
	},
	tags: {
		filename: 'tags.html',
		lang: 'html',
		code: `<span class="tag">css</span>`,
	},
	breadcrumb: {
		filename: 'breadcrumb.html',
		lang: 'html',
		code: `<nav class="breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li aria-current="page">Components</li>
  </ol>
</nav>`,
	},
	pagination: {
		filename: 'pagination.html',
		lang: 'html',
		code: `<ul class="pagination">
  <li><a href="#" class="active">2</a></li>
</ul>`,
	},
	table: {
		filename: 'table.html',
		lang: 'html',
		code: `<table class="striped">
  <thead><tr><th>Plan</th><th>Price</th></tr></thead>
  <tbody><tr><td>Pro</td><td>$12/mo</td></tr></tbody>
</table>`,
	},
	loading: {
		filename: 'loading.html',
		lang: 'html',
		code: `<span class="spinner"></span>
<div class="skeleton"></div>`,
	},
	separator: {
		filename: 'separator.html',
		lang: 'html',
		code: `<hr class="separator">
<div class="separator">Label</div>
<hr class="separator" data-orientation="vertical">`,
	},
	scroll: {
		filename: 'scroll.html',
		lang: 'html',
		code: `<div class="scroll-area">
  <p>Long content…</p>
</div>`,
	},
	code: {
		filename: 'example.js',
		lang: 'js',
		code: `import { init, toast, theme } from 'lotus-css/js';

init();

document.querySelector('#send').addEventListener('click', () => {
  toast('Message sent', { type: 'success' });
});`,
	},
	grid: {
		filename: 'grid.html',
		lang: 'html',
		code: `<div class="row">
  <div class="col-4">…</div>
  <div class="col-8">…</div>
</div>`,
	},
	utils: {
		filename: 'utils.html',
		lang: 'html',
		code: `<p class="text-center">…</p>
<div class="full-width">…</div>
<div class="stack">
  <button class="button primary">First</button>
  <button class="button outline">Second</button>
</div>`,
	},
};

/**
 * Fill every <pre data-sample="id"> with the matching sample from SAMPLES.
 * Uses textContent, so the source is injected raw (no HTML escaping) and
 * stays safe to copy and highlight.
 */	export function renderSamples(root = document) {
	root.querySelectorAll('pre[data-sample]').forEach((pre) => {
		const id = pre.getAttribute('data-sample') ?? '';
		const sample = SAMPLES[id];
		if (!sample) {
			console.warn(`[lotus-docs] no sample registered for data-sample="${id}"`);
			return;
		}
		if (sample.filename) pre.setAttribute('data-filename', sample.filename);
		const code = document.createElement('code');
		code.className = `language-${sample.lang}`;
		code.textContent = sample.code.trim();
		pre.textContent = '';
		pre.appendChild(code);
	});
}

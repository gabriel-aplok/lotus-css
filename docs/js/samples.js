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
		filename: 'components.html',
		lang: 'html',
		code: `<!-- Add data-dialog-static for alert-dialog semantics (no backdrop/Esc dismissal). -->
<button class="button primary" data-dialog-open="my-dialog">Open dialog</button>

<dialog id="my-dialog">
  <div class="dialog-header">
    <div class="dialog-header-text">
      <span class="dialog-media material-symbols-outlined" aria-hidden="true">info</span>
      <h3 class="dialog-title">Are you absolutely sure?</h3>
      <p class="dialog-description">This action cannot be undone. It will permanently delete your account from our servers.</p>
    </div>
    <button class="button clear icon-only" data-dialog-close aria-label="Close"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>
  </div>
  <div class="dialog-footer">
    <button class="button outline" data-dialog-close>Cancel</button>
    <button class="button primary" data-dialog-close>Continue</button>
  </div>
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
		filename: 'components.html',
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
<!-- locked item: <details data-accordion-item data-disabled> -->
<!-- standalone:  <details class="accordion"> -->`,
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
		filename: 'components.html',
		lang: 'html',
		code: `<!-- Variants: primary, success, warning, destructive, accent. Custom colors
     via --alert-bg / --alert-fg / --alert-border. -->
<div class="alert success">
  <span class="alert-icon material-symbols-outlined" aria-hidden="true">check_circle</span>
  <div>
    <p class="alert-title">Success</p>
    <p class="alert-description">Everything went as planned.</p>
  </div>
</div>`,
	},




	badge: {
		filename: 'badge.html',
		lang: 'html',
		code: `<!-- Variants: primary, secondary, success, warning, destructive, outline,
     ghost, link. Custom colors via --badge-bg / --badge-fg / --badge-border. -->
<span class="badge">Default</span>
<span class="badge primary">Primary</span>
<span class="badge secondary">Secondary</span>
<span class="badge destructive">Destructive</span>
<span class="badge outline">Outline</span>
<span class="badge ghost">Ghost</span>
<a class="badge link" href="#">Link</a>

<!-- Icons and spinners: mark them data-icon="inline-start" or "inline-end" -->
<span class="badge secondary"><span class="material-symbols-outlined" data-icon="inline-start" aria-hidden="true">verified</span> Verified</span>
<span class="badge destructive"><span class="spinner is-sm" data-icon="inline-start"></span> Deleting</span>
<span class="badge">Generating <span class="spinner is-sm" data-icon="inline-end"></span></span>

<span class="avatar">G</span>

<!-- Sizes: is-xs, is-sm, (default), is-lg, is-xl -->
<span class="avatar is-sm">S</span>

<!-- Status badge, bottom right; content turns it into a tile -->
<span class="avatar">G<span class="avatar-badge is-success"></span></span>
<span class="avatar">P<span class="avatar-badge is-primary"><span class="material-symbols-outlined" aria-hidden="true">add</span></span></span>

<!-- Group: overlapping avatars + a count tile. lotus.js hides failed
     images so the initials fallback shows. -->
<span class="avatar-group">
  <span class="avatar">G</span>
  <span class="avatar">R</span>
  <span class="avatar">A</span>
  <span class="avatar-group-count">+3</span>
</span>`,
	},
	tags: {
		filename: 'tags.html',
		lang: 'html',
		code: `<span class="tag">css</span>`,
	},
	breadcrumb: {
		filename: 'components.html',
		lang: 'html',
		code: `<!-- Automatic separator: any item except the last gets "/" -->
<nav class="breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Components</a></li>
    <li aria-current="page">Breadcrumb</li>
  </ol>
</nav>

<!-- Custom separator: insert <li class="breadcrumb-separator"> slots -->
<nav class="breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li class="breadcrumb-separator" aria-hidden="true"><span class="material-symbols-outlined">chevron_right</span></li>
    <li><a href="#">Components</a></li>
    <li class="breadcrumb-separator" aria-hidden="true"><span class="material-symbols-outlined">chevron_right</span></li>
    <li><span class="breadcrumb-page" aria-current="page">Breadcrumb</span></li>
  </ol>
</nav>

<!-- Collapsed trail -->
<nav class="breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li class="breadcrumb-ellipsis">
      <span aria-hidden="true">…</span>
      <span class="visually-hidden">More pages</span>
    </li>
    <li aria-current="page">Breadcrumb</li>
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

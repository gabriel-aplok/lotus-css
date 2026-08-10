// Single source of truth for every code sample on the docs site.
// Pages reference a sample with <pre data-sample="id"></pre> and
// renderSamples() fills the block from this map, so sample markup is
// never duplicated or hand-escaped inside HTML.

export const SAMPLES = {
  // ---- Landing page ---------------------------------------------------
  "quick-css": {
    filename: "index.html",
    lang: "html",
    code: '<link rel="stylesheet" href="https://unpkg.com/lotus-css">',
  },
  "quick-js": {
    filename: "index.html",
    lang: "html",
    code: '<script src="https://unpkg.com/lotus-css/dist/lotus.min.js" defer></script>',
  },
  "quick-npm": {
    filename: "terminal",
    lang: "bash",
    code: "npm install lotus-css",
  },
  customize: {
    filename: "your-theme.css",
    lang: "css",
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
    filename: "components.html",
    lang: "html",
    code: `<!-- Variants: primary / secondary / outline / ghost / success / warning / destructive -->
<button class="button primary">Primary</button>
<button class="button outline">Outline</button>
<button class="button ghost">Ghost</button>
<a class="button link" href="#">Link</a>
<button class="button" disabled>Disabled</button>

<!-- Sizes: is-xs / is-sm / (default) / is-lg, square icon-only variants -->
<button class="button is-sm">Small</button>
<button class="button is-lg">Large</button>
<button class="button outline icon-only" aria-label="Add"><span class="material-symbols-outlined" aria-hidden="true">add</span></button>

<!-- Icon + text: data-icon sizes the child; spacing comes from .icon's flex gap, or from the attribute's own margins without it -->
<button class="button outline"><span class="material-symbols-outlined" data-icon="inline-start" aria-hidden="true">add</span> New branch</button>
<button class="button icon">Fork <span class="material-symbols-outlined" data-icon="inline-end" aria-hidden="true">fork_right</span></button>

<!-- Loading state: spinner + disabled -->
<button class="button icon" disabled><span class="spinner is-sm" data-icon="inline-start"></span> Generating</button>

<!-- Groups: .grouped (gapped), .gapless (joined), .is-vertical (stacked) -->
<div class="grouped" role="group" aria-label="Actions">
  <button class="button outline">Left</button>
  <button class="button outline">Right</button>
</div>

<div class="grouped gapless">
  <button class="button outline">Left</button>
  <button class="button outline icon-only" aria-label="More"><span class="material-symbols-outlined" aria-hidden="true">more_horiz</span></button>
</div>

<!-- Divider for borderless variants -->
<div class="grouped">
  <button class="button secondary">Copy</button>
  <span class="grouped-separator" aria-hidden="true"></span>
  <button class="button secondary">Paste</button>
</div>

<!-- Static text inside a group -->
<div class="grouped">
  <span class="grouped-text">$</span>
  <input type="text" value="10.00">
  <button class="button primary">Send</button>
</div>`,
  },
  tabs: {
    filename: "tabs.html",
    lang: "html",
    code: `<div class="tabs" data-tabs>
  <button data-tab="tab1" class="active">Overview</button>
  <button data-tab="tab2">Settings</button>
</div>
<div data-tab-panel="tab1">…</div>
<div data-tab-panel="tab2" hidden>…</div>`,
  },
  cards: {
    filename: "components.html",
    lang: "html",
    code: `<!-- Slots: .card-header (.card-title, .card-description, .card-action),
     .card-content, .card-footer. Role classes (.primary, .hover, ...) still
     repaint the card. -->
<article class="card">
  <div class="card-header">
    <h3 class="card-title">Basic card</h3>
    <p class="card-description">A plain card with title, content and a footer.</p>
  </div>
  <div class="card-content">
    <p>Cards work with any semantic content.</p>
  </div>
  <div class="card-footer is-end">
    <button class="button primary">Action</button>
  </div>
</article>`,
  },
  "card-slots": {
    filename: "components.html",
    lang: "html",
    code: `<!-- Header with an action: .card-action sits top-right when present -->
<article class="card">
  <div class="card-header">
    <h3 class="card-title">Login to your account</h3>
    <p class="card-description">Enter your email below to log in.</p>
    <div class="card-action"><a class="button link" href="#">Sign up</a></div>
  </div>
  <div class="card-content">
    <!-- .field-group stacks .field rows with token spacing; labels sit flush -->
    <form class="field-group">
      <div class="field">
        <label class="field-label" for="email">Email</label>
        <input id="email" type="email" placeholder="m@example.com" required>
      </div>
      <div class="field">
        <label class="field-label" for="password">Password</label>
        <input id="password" type="password" required>
      </div>
    </form>
  </div>
  <div class="card-footer is-column">
    <button class="button primary">Login</button>
    <button class="button outline">Login with Google</button>
  </div>
</article>

<!-- .is-sm tightens spacing; override --card-spacing for custom insets -->
<article class="card is-sm">
  <div class="card-header">
    <h3 class="card-title">Scheduled reports</h3>
    <p class="card-description">Weekly snapshots. No manual exports.</p>
  </div>
</article>

<!-- Edge-to-edge content: negative --card-spacing margins pull a block flush
     with the card insets (e.g. a scrollable terms area above a footer) -->
<article class="card">
  <div class="card-content" style="margin-inline: calc(-1 * var(--card-spacing));">
    <div style="max-height: 12rem; overflow-y: auto; padding-inline: var(--card-spacing);">Terms text…</div>
  </div>
</article>`,
  },
  "card-media": {
    filename: "components.html",
    lang: "html",
    code: `<!-- An <img> as the first child spans edge to edge above the header -->
<article class="card">
  <img src="cover.jpg" alt="Event cover">
  <div class="card-header">
    <h3 class="card-title">Design systems meetup</h3>
    <div class="card-action"><span class="badge secondary">Featured</span></div>
  </div>
  <div class="card-footer">
    <button class="button primary">View event</button>
  </div>
</article>

<!-- Every inset and gap follows --card-spacing -->
<article class="card" style="--card-spacing: 2.4rem;">
  <div class="card-header">
    <h3 class="card-title">Custom spacing</h3>
    <p class="card-description">Set the variable on any card.</p>
  </div>
  <div class="card-footer is-end">
    <button class="button outline">Decline</button>
    <button class="button primary">Accept</button>
  </div>
</article>`,
  },
  dialog: {
    filename: "components.html",
    lang: "html",
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
    filename: "sheet.html",
    lang: "html",
    code: `<button data-sheet-open="my-sheet">Open</button>
<dialog class="sheet" id="my-sheet" data-side="right">
  <button data-sheet-close>Close</button>
</dialog>`,
  },
  popover: {
    filename: "popover.html",
    lang: "html",
    code: `<button data-popover-trigger="menu">Open</button>
<div class="popover" id="menu">…</div>`,
  },
  toast: {
    filename: "app.js",
    lang: "js",
    code: `import { toast } from 'lotus-css/js';

toast('Saved', { type: 'success', title: 'Done' });`,
  },
  tooltip: {
    filename: "tooltip.html",
    lang: "html",
    code: `<button data-tooltip="Help text">Hover me</button>`,
  },
  accordion: {
    filename: "components.html",
    lang: "html",
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
    filename: "carousel.html",
    lang: "html",
    code: `<div class="carousel" data-carousel>
  <button class="carousel-btn" data-carousel-prev aria-label="Previous">‹</button>
  <div class="carousel-track" data-carousel-track>
    <div class="carousel-item">
      <div class="card">…</div>
    </div>
  </div>
  <button class="carousel-btn" data-carousel-next aria-label="Next">›</button>
</div>`,
  },
  "carousel-sizes": {
    filename: "carousel.html",
    lang: "html",
    code: `<div class="carousel" data-carousel>
  <div class="carousel-track" data-carousel-track>
    <div class="carousel-item basis-1_2">…half the width…</div>
    <div class="carousel-item basis-1_3">…a third…</div>
    <div class="carousel-item basis-full">…full width…</div>
  </div>
</div>
<!-- responsive: .md-basis-1_3, .lg-basis-1_2 … -->`,
  },
  "carousel-spacing": {
    filename: "carousel.html",
    lang: "html",
    code: `<div class="carousel spacing-lg" data-carousel>
  <div class="carousel-track" data-carousel-track>
    <div class="carousel-item">…</div>
  </div>
</div>
<!-- .spacing-sm (0.8rem) · default (1.6rem) · .spacing-lg (2.4rem) -->`,
  },
  "carousel-vertical": {
    filename: "carousel.html",
    lang: "html",
    code: `<div class="carousel is-vertical" data-carousel>
  <button class="carousel-btn" data-carousel-prev aria-label="Previous">↑</button>
  <div class="carousel-track" data-carousel-track>
    <div class="carousel-item">…</div>
  </div>
  <button class="carousel-btn" data-carousel-next aria-label="Next">↓</button>
</div>`,
  },
  form: {
    filename: "form.html",
    lang: "html",
    code: `<div class="field-group">
  <div class="field">
    <label class="field-label" for="name">Name</label>
    <input id="name" type="text" placeholder="Ada Lovelace">
  </div>
  <div class="field">
    <label class="field-label" for="email">Email</label>
    <input id="email" type="email" placeholder="ada@example.com">
    <p class="field-description">We never share your email with anyone.</p>
  </div>
  <div class="field">
    <label class="field-label" for="country">Country</label>
    <select id="country">
      <option>United Kingdom</option>
      <option>United States</option>
    </select>
  </div>
  <div class="field is-horizontal">
    <button class="button primary" type="submit">Submit</button>
    <button class="button outline" type="reset">Reset</button>
  </div>
</div>`,
  },
  field: {
    filename: "field.html",
    lang: "html",
    code: `<form class="field-group">
  <fieldset class="fieldset">
    <legend class="field-legend">Payment Method</legend>
    <p class="field-description">All transactions are secure and encrypted.</p>
    <div class="field-group">
      <div class="field">
        <label class="field-label" for="card-name">Name on Card</label>
        <input id="card-name" type="text" placeholder="Evil Rabbit" required>
      </div>
      <div class="field">
        <label class="field-label" for="card-number">Card Number</label>
        <input id="card-number" type="text" placeholder="1234 5678 9012 3456" required>
        <p class="field-description">Enter your 16-digit card number.</p>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="field">
            <label class="field-label" for="exp-month">Month</label>
            <select id="exp-month"><option>MM</option></select>
          </div>
        </div>
        <div class="col-4">
          <div class="field">
            <label class="field-label" for="exp-year">Year</label>
            <select id="exp-year"><option>YYYY</option></select>
          </div>
        </div>
        <div class="col-4">
          <div class="field">
            <label class="field-label" for="cvv">CVV</label>
            <input id="cvv" type="text" placeholder="123" required>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
  <div class="field-separator">Or pay with</div>
  <fieldset class="fieldset">
    <legend class="field-legend">Billing Address</legend>
    <p class="field-description">The billing address associated with your payment method.</p>
    <div class="field-group">
      <div class="field is-horizontal">
        <input type="checkbox" id="same-shipping" checked>
        <label for="same-shipping">Same as shipping address</label>
      </div>
    </div>
  </fieldset>
  <div class="field is-horizontal">
    <button class="button primary" type="submit">Submit</button>
    <button class="button outline" type="button">Cancel</button>
  </div>
</form>`,
  },
  "field-error": {
    filename: "field-error.html",
    lang: "html",
    code: `<div class="field-group">
  <div class="field" data-invalid>
    <label class="field-label" for="username">Username</label>
    <input id="username" type="text" aria-invalid>
    <p class="field-error">Choose another username.</p>
  </div>
</div>`,
  },
  "field-responsive": {
    filename: "field-responsive.html",
    lang: "html",
    code: `<div class="field-group">
  <div class="field is-responsive">
    <div class="field-content">
      <label class="field-label" for="name">Name</label>
      <p class="field-description">Provide your full name for identification.</p>
    </div>
    <input id="name" type="text" placeholder="Evil Rabbit" required>
  </div>
  <div class="field is-responsive">
    <button class="button primary" type="submit">Submit</button>
    <button class="button outline" type="button">Cancel</button>
  </div>
</div>`,
  },
  controls: {
    filename: "controls.html",
    lang: "html",
    code: `<label><input type="checkbox" checked> Checkbox</label>
<span class="switch">
  <input type="checkbox" checked>
  <span class="track"></span>
</span>
<input type="range" min="0" max="100" value="40">`,
  },
  toggle: {
    filename: "toggle.html",
    lang: "html",
    code: `<button class="toggle" aria-pressed="true">Bold</button>
<div class="toggle-group">
  <button class="toggle" aria-pressed="false">Week</button>
</div>`,
  },
  checkbox: {
    filename: "checkbox.html",
    lang: "html",
    code: `<div class="field-group">
  <div class="field is-horizontal">
    <input type="checkbox" id="terms" checked>
    <label for="terms">Accept terms and conditions</label>
  </div>
  <div class="field is-horizontal">
    <input type="checkbox" id="terms-2" checked>
    <div class="field-content">
      <label class="field-label" for="terms-2">Accept terms and conditions</label>
      <p class="field-description">By clicking this checkbox, you agree to the terms.</p>
    </div>
  </div>
  <div class="field is-horizontal" data-disabled>
    <input type="checkbox" id="notify" disabled>
    <label for="notify">Enable notifications</label>
  </div>
  <div class="field is-horizontal" data-invalid>
    <input type="checkbox" id="terms-invalid" aria-invalid>
    <div class="field-content">
      <label class="field-label" for="terms-invalid">Accept terms and conditions</label>
      <p class="field-description">You must accept the terms to continue.</p>
    </div>
  </div>
</div>`,
  },
  "checkbox-group": {
    filename: "checkbox-group.html",
    lang: "html",
    code: `<fieldset class="fieldset">
  <legend class="field-legend is-label">Show these items on the desktop</legend>
  <p class="field-description">Select the items you want to show on the desktop.</p>
  <div class="field-group">
    <div class="field is-horizontal">
      <input type="checkbox" id="disks" checked>
      <label for="disks">Hard disks</label>
    </div>
    <div class="field is-horizontal">
      <input type="checkbox" id="external" checked>
      <label for="external">External disks</label>
    </div>
    <div class="field is-horizontal">
      <input type="checkbox" id="cds">
      <label for="cds">CDs, DVDs, and iPods</label>
    </div>
  </div>
</fieldset>`,
  },
  nav: {
    filename: "nav.html",
    lang: "html",
    code: `<nav class="nav">
  <div class="nav-left"><a class="brand" href="#">LOTUS</a></div>
  <div class="nav-right">
    <a href="#" aria-current="page">Home</a>
  </div>
</nav>`,
  },
  dropdown: {
    filename: "dropdown.html",
    lang: "html",
    code: `<details class="dropdown">
  <summary>Menu</summary>
  <div class="dropdown-menu">…</div>
</details>`,
  },
  alert: {
    filename: "components.html",
    lang: "html",
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
    filename: "badge.html",
    lang: "html",
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
  "chat-bubble": {
    filename: "components.html",
    lang: "html",
    code: `<!-- A thread: .chat > (.bubble | .bubble-group). Ghost = assistant prose. -->
<div class="chat">
  <div class="bubble ghost">
    <div class="bubble-content">How can I help you today?</div>
  </div>

  <!-- Consecutive bubbles from one sender; set .is-end on each bubble -->
  <div class="bubble-group">
    <div class="bubble is-end">
      <div class="bubble-content">Hey! Did you see the new design files?</div>
    </div>
    <div class="bubble is-end">
      <div class="bubble-content">Also, the build failed on main.</div>
      <div class="bubble-reactions" role="img" aria-label="Reactions: thumbs up, fire, and 2 more">
        <span class="material-symbols-outlined" aria-hidden="true">thumb_up</span>
        <span class="material-symbols-outlined" aria-hidden="true">local_fire_department</span>
        <span>+2</span>
      </div>
      <span class="bubble-meta"><span class="material-symbols-outlined" aria-hidden="true">done_all</span> Seen · 4:32 PM</span>
    </div>
  </div>

  <div class="bubble secondary">
    <div class="bubble-content">On it. Found the issue and fixed it.</div>
  </div>
</div>

<!-- Variants: secondary, muted, tinted, outline, ghost, destructive.
     Reactions anchor bottom/end by default; data-side="top" anchors the
     upper edge. -->
<div class="bubble muted">
  <div class="bubble-content">Muted supporting content.</div>
</div>
<div class="bubble tinted is-end">
  <div class="bubble-content">Tinted primary-derived fill.</div>
</div>
<div class="bubble outline">
  <div class="bubble-content">Bordered, for rich content.</div>
</div>
<div class="bubble destructive is-end">
  <div class="bubble-content">Errors and failed actions.</div>
</div>`,
  },
  "chat-variants": {
    filename: "components.html",
    lang: "html",
    code: `<!-- Seven variants: (default) primary, secondary, muted, tinted, outline,
     ghost, destructive. Alignment: add .is-end to the bubble. -->
<div class="bubble muted">
  <div class="bubble-content">Muted supporting content.</div>
</div>
<div class="bubble tinted is-end">
  <div class="bubble-content">Tinted primary-derived fill.</div>
</div>
<div class="bubble outline">
  <div class="bubble-content">Bordered, for rich content.</div>
</div>
<div class="bubble destructive is-end">
  <div class="bubble-content">Errors and failed actions.</div>
</div>

<!-- Reactions: data-side="top" anchors the upper edge; data-align="start"
     anchors the inline start. Group them as one image for screen readers. -->
<div class="bubble is-end">
  <div class="bubble-content">Tests passed.</div>
  <div class="bubble-reactions" data-side="top" role="img" aria-label="Reactions: party popper, clapping">
    <span class="material-symbols-outlined" aria-hidden="true">celebration</span>
    <span class="material-symbols-outlined" aria-hidden="true">handshake</span>
  </div>
</div>`,
  },
  "chat-attachment": {
    filename: "components.html",
    lang: "html",
    code: `<!-- File attachment: media, content, actions -->
<div class="attachment">
  <div class="attachment-media"><span class="material-symbols-outlined" aria-hidden="true">description</span></div>
  <div class="attachment-content">
    <div class="attachment-title">report.pdf</div>
    <div class="attachment-description">PDF · 2.4 MB</div>
  </div>
  <div class="attachment-actions">
    <button class="attachment-action" aria-label="Remove report.pdf"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>
  </div>
</div>

<!-- Image: .attachment-media.image + is-vertical stacks media above content -->
<div class="attachment is-vertical" style="width: 20rem;">
  <div class="attachment-media image"><img src="photo.png" alt="Photo"></div>
  <div class="attachment-content">
    <div class="attachment-title">photo.png</div>
    <div class="attachment-description">PNG · 820 KB</div>
  </div>
</div>

<!-- Full-card trigger: fills the card behind the actions, so the actions
     stay separately clickable. -->
<a class="attachment-trigger" href="photo.png" target="_blank" rel="noreferrer" aria-label="Open photo.png"></a>

<!-- Scrollable, snapping row with an edge fade -->
<div class="attachment-group" tabindex="0" role="group" aria-label="Attachments">
  <div class="attachment is-vertical" style="width: 20rem;">…</div>
  <div class="attachment is-vertical" style="width: 20rem;">…</div>
</div>`,
  },
  "attachment-states": {
    filename: "components.html",
    lang: "html",
    code: `<!-- data-state: idle | uploading | processing | error | done.
     uploading / processing shimmer the title; error tints destructive. -->
<div class="attachment" data-state="uploading">
  <div class="attachment-media"><span class="spinner is-sm"></span></div>
  <div class="attachment-content">
    <div class="attachment-title">design-system.zip</div>
    <div class="attachment-description">Uploading · 64%</div>
  </div>
  <div class="attachment-actions">
    <button class="attachment-action" aria-label="Cancel upload"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>
  </div>
</div>

<div class="attachment is-sm" data-state="error">
  <div class="attachment-media"><span class="material-symbols-outlined" aria-hidden="true">error</span></div>
  <div class="attachment-content">
    <div class="attachment-title">financial-model.xlsx</div>
    <div class="attachment-description">Upload failed. Try again.</div>
  </div>
</div>

<!-- Sizes: is-sm / is-xs -->
<div class="attachment is-xs">
  <div class="attachment-media"><span class="material-symbols-outlined" aria-hidden="true">description</span></div>
  <div class="attachment-content">
    <div class="attachment-title">Extra small attachment</div>
  </div>
</div>`,
  },
  tags: {
    filename: "tags.html",
    lang: "html",
    code: `<span class="tag">css</span>`,
  },
  breadcrumb: {
    filename: "components.html",
    lang: "html",
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
    filename: "pagination.html",
    lang: "html",
    code: `<ul class="pagination">
  <li><a href="#" class="active">2</a></li>
</ul>`,
  },
  table: {
    filename: "table.html",
    lang: "html",
    code: `<table class="striped">
  <thead><tr><th>Plan</th><th>Price</th></tr></thead>
  <tbody><tr><td>Pro</td><td>$12/mo</td></tr></tbody>
</table>`,
  },
  "checkbox-table": {
    filename: "checkbox-table.html",
    lang: "html",
    code: `<table>
  <thead>
    <tr>
      <th><input type="checkbox" data-select-all aria-label="Select all rows"></th>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr data-state="selected">
      <td><input type="checkbox" data-select-item checked aria-label="Select row"></td>
      <td>Sarah Chen</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td><input type="checkbox" data-select-item aria-label="Select row"></td>
      <td>Priya Patel</td>
      <td>User</td>
    </tr>
  </tbody>
</table>`,
  },
  loading: {
    filename: "loading.html",
    lang: "html",
    code: `<span class="spinner"></span>
<div class="skeleton"></div>`,
  },
  separator: {
    filename: "separator.html",
    lang: "html",
    code: `<hr class="separator">
<div class="separator">Label</div>
<hr class="separator" data-orientation="vertical">`,
  },
  scroll: {
    filename: "scroll.html",
    lang: "html",
    code: `<div class="scroll-area">
  <p>Long content…</p>
</div>`,
  },
  code: {
    filename: "example.js",
    lang: "js",
    code: `import { init, toast, theme } from 'lotus-css/js';

init();

document.querySelector('#send').addEventListener('click', () => {
  toast('Message sent', { type: 'success' });
});`,
  },
  grid: {
    filename: "grid.html",
    lang: "html",
    code: `<div class="row">
  <div class="col-4">…</div>
  <div class="col-8">…</div>
</div>`,
  },
  "utils-text": {
    filename: "utils.html",
    lang: "html",
    code: `<p class="text-left">Left-aligned</p>
<p class="text-center">Centered</p>
<p class="text-right">Right-aligned</p>
<p class="text-upper">Uppercase</p>
<p class="text-lower">Lowercase</p>
<p class="text-capital">Capitalized words</p>
<p class="text-truncate">This long line gets clipped with an ellipsis…</p>`,
  },
  "utils-layout": {
    filename: "utils.html",
    lang: "html",
    code: `<div class="flex items-center justify-between">
  <span>Left side</span>
  <button class="button primary">Action</button>
</div>
<div class="full-width">Full width</div>
<div class="flex">
  <div class="grow">Grows to fill</div>
  <div class="shrink-0">Stays put</div>
</div>`,
  },
  "utils-colors": {
    filename: "utils.html",
    lang: "html",
    code: `<span class="badge primary">.primary</span>
<span class="badge secondary">.secondary</span>
<span class="badge muted">.muted</span>
<span class="badge accent">.accent</span>
<span class="badge success">.success</span>
<span class="badge warning">.warning</span>
<span class="badge destructive">.destructive</span>
<span class="badge outline ring-color">.ring-color</span>`,
  },
  utils: {
    filename: "utils.html",
    lang: "html",
    code: `<div class="stack">
  <button class="button primary">First</button>
  <button class="button outline">Second</button>
</div>
<span class="badge outline hide-print">.hide-print</span>
<span class="badge outline hide-xs">.hide-xs</span>`,
  },
};

/**
 * Fill every <pre data-sample="id"> with the matching sample from SAMPLES.
 * Uses textContent, so the source is injected raw (no HTML escaping) and
 * stays safe to copy and highlight.
 */ export function renderSamples(root = document) {
  root.querySelectorAll("pre[data-sample]").forEach((pre) => {
    const id = pre.getAttribute("data-sample") ?? "";
    const sample = SAMPLES[id];
    if (!sample) {
      console.warn(`[lotus-docs] no sample registered for data-sample="${id}"`);
      return;
    }
    if (sample.filename) pre.setAttribute("data-filename", sample.filename);
    const code = document.createElement("code");
    code.className = `language-${sample.lang}`;
    code.textContent = sample.code.trim();
    pre.textContent = "";
    pre.appendChild(code);
  });
}

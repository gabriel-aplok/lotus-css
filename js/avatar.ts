// Avatars: hide broken images so the initials fallback shows through.
// Pure CSS can't detect a failed image load, so this tiny enhancement does.

function hideBroken(img: HTMLImageElement): void {
	// Keep a label when the image goes away: mirror alt onto the avatar unless
	// it already carries a title.
	const parent = img.parentElement;
	if (parent && !parent.hasAttribute('title') && img.alt) {
		parent.setAttribute('title', img.alt);
	}
	img.hidden = true;
}

/** Hide every failed .avatar image under root; already-broken ones too. */
export function initAvatars(root: ParentNode = document): void {
	root.querySelectorAll<HTMLImageElement>('.avatar img').forEach((img) => {
		if (img.complete && img.naturalWidth === 0) {
			hideBroken(img);
			return;
		}
		img.addEventListener('error', () => hideBroken(img), { once: true });
	});
}

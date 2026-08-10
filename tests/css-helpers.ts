/** Shared helpers for CSS source-guard tests. */

/** Extract top-level (selector, body) blocks after stripping comments. */
export function topLevelBlocks(css: string): Array<{ selector: string; body: string }> {
	const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
	const blocks: Array<{ selector: string; body: string }> = [];
	let depth = 0;
	let blockStart = 0;
	let selector = '';
	let bodyStart = 0;
	for (let i = 0; i < cleaned.length; i++) {
		const ch = cleaned[i];
		if (ch === '{') {
			if (depth === 0) {
				selector = cleaned.slice(blockStart, i).trim().replace(/\s+/g, ' ');
				bodyStart = i + 1;
			}
			depth++;
		} else if (ch === '}') {
			depth--;
			if (depth === 0) {
				blocks.push({ selector, body: cleaned.slice(bodyStart, i) });
				blockStart = i + 1;
			}
		}
	}
	return blocks;
}

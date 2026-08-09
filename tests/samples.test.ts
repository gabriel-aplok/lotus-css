import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SAMPLES } from '../docs/js/samples';

type Sample = (typeof SAMPLES)['quick-css'];
const samples = SAMPLES as Record<string, Sample>;

const PAGES = ['index.html', 'demo.html'];

function sampleIds(): Set<string> {
	const ids = new Set<string>();
	for (const page of PAGES) {
		const html = readFileSync(join(process.cwd(), 'docs', page), 'utf8');
		for (const match of html.matchAll(/data-sample="([^"]+)"/g)) {
			ids.add(match[1]);
		}
	}
	return ids;
}

describe('docs code samples', () => {
	it('every data-sample id on every page resolves in SAMPLES', () => {
		const ids = sampleIds();
		expect(ids.size).toBeGreaterThan(0);
		ids.forEach((id) => {
			expect(samples[id], `missing sample for "${id}"`).toBeDefined();
		});
	});

	it('every sample has a filename, language and code', () => {
		expect(Object.keys(samples).length).toBeGreaterThan(0);
		for (const [id, sample] of Object.entries(samples) as [string, Sample][]) {
			expect(sample.filename, `${id}.filename`).toBeTruthy();
			expect(sample.lang, `${id}.lang`).toBeTruthy();
			expect(typeof sample.code, `${id}.code`).toBe('string');
			expect(sample.code.length, `${id}.code length`).toBeGreaterThan(0);
		}
	});
});

// Removes generated build output so the next build starts fresh.
import { rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

rmSync(join(root, 'dist'), { recursive: true, force: true });
console.log('🧹 cleaned dist/');

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const target = resolve('dist/styles.css');
await mkdir(dirname(target), { recursive: true });

const variables = await readFile(resolve('src/styles/variables.css'), 'utf8');
const components = await readFile(resolve('src/styles/components.css'), 'utf8');
await writeFile(target, `${variables}\n${components}`);

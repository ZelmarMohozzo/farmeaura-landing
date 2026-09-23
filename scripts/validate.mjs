import { readFile,access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const html = await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) { if (!match[1].includes(':')) await access(new URL('../dist/'+match[1],import.meta.url)); }
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs únicos');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), 'Destino: '+match[1]);
for (const text of ['Zelmar','Martín','Gerónimo','og:title','twitter:card','canonical','name="viewport"','role="status"']) assert(html.includes(text),text);
assert.equal((html.match(/<h1>/g)||[]).length,1);
console.log('Build estático válido: assets, navegación, metadata y estructura.');

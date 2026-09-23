import assert from 'node:assert/strict';
import { server } from '../server.mjs';
await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
const origin = 'http://127.0.0.1:'+server.address().port;
try {
for (const route of ['/','/styles.css','/app.js','/config.js','/assets/icon.png','/assets/logo.png']) { const r = await fetch(origin+route); assert.equal(r.status,200,route); assert(r.headers.get('content-security-policy')); }
assert.equal((await fetch(origin+'/api/waitlist',{method:'POST'})).status,405);
assert.equal((await fetch(origin+'/missing')).status,404);
assert.equal((await fetch(origin+'/package.json')).status,404);
console.log('Servidor local OK: página, recursos, seguridad y API no simulada.');
} finally { server.closeAllConnections(); await new Promise(resolve=>server.close(resolve)); }

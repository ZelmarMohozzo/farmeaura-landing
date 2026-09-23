import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.png':'image/png', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml' };
export const server = http.createServer(async (req,res) => {
  const headers = { 'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'strict-origin-when-cross-origin', 'Content-Security-Policy':"default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'" };
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{...headers,Allow:'GET, HEAD'}); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root)) throw new Error('outside-root');
    const body = await readFile(file);
    res.writeHead(200, {...headers,'Content-Type':mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'}); res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404, {...headers,'Content-Type':'text/plain; charset=utf-8'}); res.end('No encontrado'); }
});
if (process.argv[1] === fileURLToPath(import.meta.url)) server.listen(Number(process.env.PORT || 3000),'0.0.0.0',()=>console.log('Farme Aura lista'));

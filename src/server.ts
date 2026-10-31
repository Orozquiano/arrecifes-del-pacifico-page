import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { existsSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { prerenderRelativePath, sanitizePublicRelative } from './server-paths';

const browserDistFolder = join(import.meta.dirname, '../browser');

/**
 * @function resolveInside
 * @description Resuelve una ruta dentro de la carpeta pública y rechaza salidas del directorio.
 * @param relativePath Ruta relativa al directorio público.
 * @returns Ruta absoluta segura, o null si intenta salir de la carpeta.
 */
function resolveInside(relativePath: string): string | null {
  const cleaned = normalize(sanitizePublicRelative(relativePath));
  const full = resolve(browserDistFolder, cleaned);
  const root = resolve(browserDistFolder);
  if (full !== root && !full.startsWith(root + sep)) {
    return null;
  }
  return full;
}

/**
 * @description Extensiones que solo pueden responderse como archivo estático.
 * Si faltan, no deben caer en el HTML de Angular.
 */
const STATIC_EXTENSIONS = new Set([
  '.css',
  '.js',
  '.mjs',
  '.map',
  '.json',
  '.txt',
  '.xml',
  '.woff2',
  '.woff',
  '.ttf',
  '.ico',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.gif',
  '.avif',
]);

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
    immutable: true,
  }),
);

/**
 * @description Entrega el HTML prerenderizado que está junto a los archivos con hash.
 * Así el documento y el CSS pertenecen a la misma carpeta, aunque el proceso
 * haya arrancado con un manifiesto anterior.
 */
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next();
    return;
  }

  const extension = extname(req.path).toLowerCase();
  if (STATIC_EXTENSIONS.has(extension)) {
    res.status(404).type('text/plain').send('Not found');
    return;
  }

  const relative = prerenderRelativePath(req.path);
  const page = resolveInside(relative);
  if (!page || !existsSync(page)) {
    next();
    return;
  }

  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(page);
});

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

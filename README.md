# Arrecifes del Pacífico

Sitio público de la empresa de buceo en Cali. La información sale del sitio anterior y de sus folletos. El detalle de fuentes, huecos y recursos está en [docs/content-inventory.md](docs/content-inventory.md).

## Versiones comprobadas

Consulta hecha el 30 de octubre de 2026 con npm:

| Pieza | Versión publicada estable | En este proyecto |
| --- | --- | --- |
| `@angular/core` | 22.2.4 | 22.2.4 |
| `@angular/cli`, `@angular/build`, `@angular/ssr` | 22.2.5 | 22.2.5 |
| TypeScript | Angular 22.2 admite `>=6.0 <6.1` | 6.0.3 |
| Node.js usado | CLI admite `^22.22.3`, `^24.15.0` o `>=26` | 26.12.1 |

No se usaron versiones `next`, `beta` ni `rc`. TypeScript 7 no es compatible con este Angular.

## Comandos

```bash
npm ci
npm start
npm run build
npm test
npm run serve:ssr:arrecifes-del-pacifico-page
```

`npm start` abre el desarrollo en http://localhost:4200/. El build de producción deja el resultado en `dist/arrecifes-del-pacifico-page`. El servidor de producción escucha en el puerto de la variable `PORT` o, si no existe, en el 4000.

## Hosting

La aplicación prerenderiza las páginas públicas y renderiza en el servidor las direcciones que no existen, con hidratación en el navegador.

Para publicar hace falta Node.js, no solo los archivos estáticos:

```bash
npm run build
node dist/arrecifes-del-pacifico-page/server/server.mjs
```

El servidor solo acepta estos hosts: `localhost`, `127.0.0.1`, `arrecifesdelpacifico.com` y `www.arrecifesdelpacifico.com`. Están en `angular.json`, en `security.allowedHosts`. Otro dominio debe agregarse ahí y volver a construir. La variable `NG_ALLOWED_HOSTS` reemplaza esa lista por completo; si se usa, hay que incluir todos los hosts necesarios, separados por comas.

Antes de publicar, confirma que `siteConfig.origin` en `src/app/core/config/site.config.ts` sea el dominio real. Ese valor arma las URL canónicas y Open Graph. `public/sitemap.xml` y `public/robots.txt` usan `https://arrecifesdelpacifico.com`.

Las rutas conocidas también quedan como HTML en `dist/arrecifes-del-pacifico-page/browser`. Una dirección inexistente necesita el servidor de Node para responder 404 con la página del sitio.

## Qué no incluye esta etapa

No hay carrito, pagos, formulario simulado, panel administrativo ni publicación sobre el sitio que está en línea.

/**
 * @function prerenderRelativePath
 * @description Convierte la ruta del navegador en una ruta relativa al directorio browser.
 * En Windows un slash inicial haría que path.resolve saliera a la raíz de la unidad.
 * @param requestPath Ruta pedida por el navegador.
 * @returns Ruta relativa al HTML prerenderizado, sin slash inicial.
 */
export function prerenderRelativePath(requestPath: string): string {
  const trimmed = requestPath.replace(/^\/+|\/+$/g, '');
  return trimmed === '' ? 'index.html' : `${trimmed}/index.html`;
}

/**
 * @function sanitizePublicRelative
 * @description Quita slash inicial y segmentos `..` iniciales antes de resolver en disco.
 * @param relativePath Ruta pedida hacia la carpeta pública.
 * @returns Ruta relativa saneada.
 */
export function sanitizePublicRelative(relativePath: string): string {
  return relativePath.replace(/^[/\\]+/, '').replace(/^(\.\.(\/|\\|$))+/, '');
}

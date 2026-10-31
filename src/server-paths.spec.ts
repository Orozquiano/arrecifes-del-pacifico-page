import { prerenderRelativePath, sanitizePublicRelative } from './server-paths';

describe('prerenderRelativePath', () => {
  it('omite el slash inicial para no salir del directorio en Windows', () => {
    expect(prerenderRelativePath('/')).toBe('index.html');
    expect(prerenderRelativePath('/cursos')).toBe('cursos/index.html');
    expect(prerenderRelativePath('/cursos/')).toBe('cursos/index.html');
    expect(prerenderRelativePath('/cursos/natacion')).toBe('cursos/natacion/index.html');
    expect(prerenderRelativePath('/viajes/gorgona-octubre-2026/')).toBe(
      'viajes/gorgona-octubre-2026/index.html',
    );
  });
});

describe('sanitizePublicRelative', () => {
  it('elimina slash inicial y segmentos de salida', () => {
    expect(sanitizePublicRelative('/cursos/index.html')).toBe('cursos/index.html');
    expect(sanitizePublicRelative('../secret.html')).toBe('secret.html');
  });
});

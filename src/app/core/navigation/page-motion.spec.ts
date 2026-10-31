import { pathOf, topIsDeep } from './page-motion';

describe('page-motion helpers', () => {
  it('normaliza la ruta sin consulta ni ancla', () => {
    expect(pathOf('')).toBe('/');
    expect(pathOf('/')).toBe('/');
    expect(pathOf('/cursos?x=1')).toBe('/cursos');
    expect(pathOf('/viajes#salida')).toBe('/viajes');
  });

  it('marca como profundas el inicio y las fichas con fotografía', () => {
    expect(topIsDeep('/')).toBe(true);
    expect(topIsDeep('/cursos/open-water')).toBe(true);
    expect(topIsDeep('/viajes/gorgona')).toBe(true);
    expect(topIsDeep('/cursos')).toBe(false);
    expect(topIsDeep('/nosotros')).toBe(false);
  });
});

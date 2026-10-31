import { formatDateRange } from './dates';
import { classifyTrip } from './trip-status';

describe('estado de las salidas', () => {
  it('distingue una salida futura, una en curso y una terminada', () => {
    expect(classifyTrip('2026-10-30', '2026-11-03', '2026-10-29')).toBe('programada');
    expect(classifyTrip('2026-10-30', '2026-11-03', '2026-10-30')).toBe('en-curso');
    expect(classifyTrip('2026-10-30', '2026-11-03', '2026-11-03')).toBe('en-curso');
    expect(classifyTrip('2026-10-30', '2026-11-03', '2026-11-04')).toBe('realizada');
  });

  it('no trata marzo de 2026 como salida futura en octubre', () => {
    expect(classifyTrip('2026-03-27', '2026-03-31', '2026-10-30')).toBe('realizada');
  });

  it('escribe el rango de Gorgona en español', () => {
    expect(formatDateRange('2026-10-30', '2026-11-03')).toBe(
      '30 de octubre al 3 de noviembre de 2026',
    );
  });
});

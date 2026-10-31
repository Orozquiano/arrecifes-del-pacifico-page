import { TripPhase } from './models';

/**
 * @function classifyTrip
 * @description Clasifica una salida según si aún no empieza, está en curso o ya terminó.
 * @param start Fecha inicial en formato AAAA-MM-DD.
 * @param end Fecha final en formato AAAA-MM-DD.
 * @param today Fecha de consulta en formato AAAA-MM-DD.
 * @returns Fase de la salida.
 */
export function classifyTrip(start: string, end: string, today: string): TripPhase {
  if (today < start) {
    return 'programada';
  }

  if (today > end) {
    return 'realizada';
  }

  return 'en-curso';
}

/**
 * @function phaseLabel
 * @description Devuelve la etiqueta visible de una fase de viaje.
 * @param phase Fase calculada.
 * @returns Texto en español.
 */
export function phaseLabel(phase: TripPhase): string {
  switch (phase) {
    case 'programada':
      return 'Próxima salida';
    case 'en-curso':
      return 'Salida en curso';
    case 'realizada':
      return 'Experiencia anterior';
  }
}

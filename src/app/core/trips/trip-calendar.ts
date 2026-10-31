import { Injectable, afterNextRender, signal } from '@angular/core';
import { todayInBogota } from '../../content/dates';
import { TripPhase } from '../../content/models';
import { classifyTrip } from '../../content/trip-status';
import { trips } from '../../content/trips';

const publishedPhases: Record<string, TripPhase> = Object.fromEntries(
  trips.map((trip) => [trip.slug, trip.phaseAtPublication]),
);

/**
 * @class TripCalendar
 * @description Conserva la fase publicada para el HTML inicial y la actualiza en el navegador según la fecha de Bogotá.
 */
@Injectable({ providedIn: 'root' })
export class TripCalendar {
  /**
   * @description Fase de cada salida. La primera lectura coincide entre servidor y cliente.
   */
  readonly phases = signal<Readonly<Record<string, TripPhase>>>(publishedPhases);

  constructor() {
    afterNextRender(() => {
      const today = todayInBogota();
      const next: Record<string, TripPhase> = {};
      for (const trip of trips) {
        next[trip.slug] = classifyTrip(trip.start, trip.end, today);
      }
      this.phases.set(next);
    });
  }

  /**
   * @function phase
   * @description Lee la fase actual de una salida.
   * @param slug Identificador de la salida.
   * @returns Fase publicada o recalculada.
   */
  phase(slug: string): TripPhase {
    return this.phases()[slug] ?? 'realizada';
  }
}

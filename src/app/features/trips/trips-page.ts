import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripCalendar } from '../../core/trips/trip-calendar';
import { SeoService } from '../../core/seo/seo.service';
import { formatDateRange } from '../../content/dates';
import { Trip } from '../../content/models';
import { phaseLabel } from '../../content/trip-status';
import { tripMentions, trips } from '../../content/trips';
import { InquiryLink } from '../../shared/inquiry-link';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * @class TripsPage
 * @description Muestra las salidas documentadas y distingue las que ya pasaron.
 */
@Component({
  selector: 'app-trips-page',
  imports: [RouterLink, InquiryLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trips-page.html',
  host: { class: 'page' },
})
export class TripsPage {
  private readonly seo = inject(SeoService);
  private readonly calendar = inject(TripCalendar);

  /**
   * @description Menciones sin ficha propia.
   */
  readonly mentions = tripMentions;

  /**
   * @description Formato legible de las fechas.
   */
  readonly formatDateRange = formatDateRange;

  constructor() {
    this.seo.setPage({
      title: 'Viajes de buceo',
      description:
        'Salidas documentadas de Arrecifes del Pacífico a Gorgona y Providencia, y la forma de consultar las próximas.',
      path: '/viajes',
    });
  }

  /**
   * @function upcomingTrips
   * @description Salidas que no están marcadas como realizadas.
   * @returns Lista vigente según la fecha de Bogotá.
   */
  upcomingTrips(): readonly Trip[] {
    return trips.filter((trip) => this.calendar.phase(trip.slug) !== 'realizada');
  }

  /**
   * @function pastTrips
   * @description Salidas cuya fecha final ya pasó.
   * @returns Experiencias anteriores.
   */
  pastTrips(): readonly Trip[] {
    return trips.filter((trip) => this.calendar.phase(trip.slug) === 'realizada');
  }

  /**
   * @function phaseOf
   * @description Etiqueta de la fase de una salida.
   * @param trip Salida consultada.
   * @returns Texto visible.
   */
  phaseOf(trip: Trip): string {
    return phaseLabel(this.calendar.phase(trip.slug));
  }
}

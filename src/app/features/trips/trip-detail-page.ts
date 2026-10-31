import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tripInquiryMessage } from '../../core/contact/contact-links';
import { SeoService } from '../../core/seo/seo.service';
import { TripCalendar } from '../../core/trips/trip-calendar';
import { formatDateRange } from '../../content/dates';
import { phaseLabel } from '../../content/trip-status';
import { findTrip } from '../../content/trips';
import { InquiryLink } from '../../shared/inquiry-link';
import { NotFoundPage } from '../not-found/not-found-page';

/**
 * @class TripDetailPage
 * @description Detalla una salida documentada, sin simular disponibilidad.
 */
@Component({
  selector: 'app-trip-detail-page',
  imports: [RouterLink, InquiryLink, NotFoundPage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-detail-page.html',
  host: { class: 'page' },
})
export class TripDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly calendar = inject(TripCalendar);

  /**
   * @description Salida de la ruta, si existe.
   */
  readonly trip = findTrip(this.route.snapshot.paramMap.get('slug'));

  /**
   * @description Fechas en español.
   */
  readonly dates = this.trip ? formatDateRange(this.trip.start, this.trip.end) : '';

  /**
   * @description Mensaje de consulta con destino y fechas.
   */
  readonly inquiry = this.trip ? tripInquiryMessage(this.trip.destination, this.dates) : '';

  constructor() {
    if (!this.trip) {
      return;
    }

    this.seo.setPage({
      title: this.trip.title,
      description: `${this.trip.summary} Fechas publicadas: ${this.dates}.`,
      path: `/viajes/${this.trip.slug}`,
      image: this.trip.image.src,
    });
  }

  /**
   * @function phase
   * @description Etiqueta actual de la salida.
   * @returns Texto de la fase.
   */
  phase(): string {
    return this.trip ? phaseLabel(this.calendar.phase(this.trip.slug)) : '';
  }
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { buildWhatsAppUrl } from '../../core/contact/contact-links';
import { siteConfig } from '../../core/config/site.config';
import { SeoService } from '../../core/seo/seo.service';
import { TripCalendar } from '../../core/trips/trip-calendar';
import { coursesByGroup } from '../../content/courses';
import { formatDateRange } from '../../content/dates';
import { gallery } from '../../content/gallery';
import { Trip } from '../../content/models';
import { phaseLabel } from '../../content/trip-status';
import { tripMentions, trips } from '../../content/trips';
import { YoutubePlayer } from '../../shared/youtube-player';
import { InquiryLink } from '../../shared/inquiry-link';
import { Lightbox } from '../../shared/lightbox';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * @class HomePage
 * @description Presenta la empresa, la oferta de cursos, los viajes y las vías de contacto.
 */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RevealDirective, InquiryLink, YoutubePlayer, Lightbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.html',
  host: { class: 'page' },
})
export class HomePage {
  private readonly seo = inject(SeoService);
  private readonly calendar = inject(TripCalendar);

  /**
   * @description Datos públicos de contacto.
   */
  readonly site = siteConfig;

  /**
   * @description Cursos para quien empieza.
   */
  readonly starting = coursesByGroup('empezar');

  /**
   * @description Cursos para quien ya tiene una base.
   */
  readonly continuing = coursesByGroup('continuar');

  /**
   * @description Salidas con folleto.
   */
  readonly trips = trips;

  /**
   * @description Experiencias solo documentadas en redes.
   */
  readonly mentions = tripMentions;

  /**
   * @description Fotografías de la galería.
   */
  readonly gallery = gallery;

  /**
   * @description Indica si el móvil muestra todas las fotografías.
   */
  readonly galleryExpanded = signal(false);

  /**
   * @description Formatea el rango de una salida.
   */
  readonly formatDateRange = formatDateRange;

  /**
   * @description Etiqueta visible de la fase de una salida.
   */
  readonly phaseLabel = phaseLabel;

  /**
   * @description WhatsApp con el mensaje general.
   */
  readonly whatsapp = buildWhatsAppUrl();

  /**
   * @description Imagen previa del video de Gorgona.
   */
  readonly videoPoster = {
    src: '/images/video-gorgona.png',
    alt: 'Cardumen sobre un arrecife, imagen previa del video de Gorgona publicado en 2019.',
    width: 805,
    height: 453,
  };

  constructor() {
    this.seo.setPage({
      title: 'Arrecifes del Pacífico | Buceo y cursos en Cali',
      description:
        'Cursos de natación y buceo en Cali, viajes a Gorgona y Providencia, y equipos. Arrecifes del Pacífico, desde 1989.',
      path: '/',
      image: '/images/hero-arrecife.webp',
    });
  }

  /**
   * @function phaseOf
   * @description Obtiene la fase visible de una salida.
   * @param trip Salida consultada.
   * @returns Etiqueta en español.
   */
  phaseOf(trip: Trip): string {
    return this.phaseLabel(this.calendar.phase(trip.slug));
  }

  /**
   * @function upcomingTrips
   * @description Lista las salidas que no figuran como realizadas.
   * @returns Salidas programadas o en curso.
   */
  upcomingTrips(): readonly Trip[] {
    return this.trips.filter((trip) => this.calendar.phase(trip.slug) !== 'realizada');
  }

  /**
   * @function pastTrips
   * @description Lista las salidas cuya fecha ya terminó.
   * @returns Experiencias anteriores.
   */
  pastTrips(): readonly Trip[] {
    return this.trips.filter((trip) => this.calendar.phase(trip.slug) === 'realizada');
  }
}

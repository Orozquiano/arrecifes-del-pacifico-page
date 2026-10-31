import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteConfig } from '../../core/config/site.config';
import { SeoService } from '../../core/seo/seo.service';
import { YoutubePlayer } from '../../shared/youtube-player';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * @class AboutPage
 * @description Cuenta la trayectoria publicada, el enfoque de enseñanza y el cuidado del mar.
 */
@Component({
  selector: 'app-about-page',
  imports: [RouterLink, YoutubePlayer, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-page.html',
  host: { class: 'page' },
})
export class AboutPage {
  private readonly seo = inject(SeoService);

  /**
   * @description Datos públicos de la empresa.
   */
  readonly site = siteConfig;

  /**
   * @description Imagen previa del video.
   */
  readonly videoPoster = {
    src: '/images/video-gorgona.png',
    alt: 'Cardumen sobre un arrecife, imagen previa del video de Gorgona publicado en 2019.',
    width: 805,
    height: 453,
  };

  constructor() {
    this.seo.setPage({
      title: 'Nosotros',
      description:
        'Arrecifes del Pacífico, empresa de buceo en Cali desde 1989. Enseñanza, asesoría y compromiso con el mar.',
      path: '/nosotros',
      image: '/images/sede.jpg',
    });
  }
}

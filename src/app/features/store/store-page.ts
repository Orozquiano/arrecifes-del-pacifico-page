import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { siteConfig } from '../../core/config/site.config';
import { SeoService } from '../../core/seo/seo.service';
import { InquiryLink } from '../../shared/inquiry-link';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * @class StorePage
 * @description Presenta la asesoría de equipo y el canal comercial ya publicado.
 */
@Component({
  selector: 'app-store-page',
  imports: [InquiryLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './store-page.html',
  host: { class: 'page' },
})
export class StorePage {
  private readonly seo = inject(SeoService);

  /**
   * @description Enlaces y dirección de la sede.
   */
  readonly site = siteConfig;

  constructor() {
    this.seo.setPage({
      title: 'Tienda de equipo de buceo',
      description:
        'Equipo de buceo y asesoría en la sede de Cali. La compra se hace en la tienda de Mercado Libre de Arrecifes del Pacífico.',
      path: '/tienda',
      image: '/images/sede.jpg',
    });
  }
}

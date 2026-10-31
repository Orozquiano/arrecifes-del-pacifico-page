import { ChangeDetectionStrategy, Component, RESPONSE_INIT, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

/**
 * @class NotFoundPage
 * @description Explica que la ruta no existe y ofrece salidas útiles del sitio.
 */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found-page.html',
  host: { class: 'page' },
})
export class NotFoundPage {
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  private readonly response = inject(RESPONSE_INIT, { optional: true });

  constructor() {
    if (this.response) {
      this.response.status = 404;
    }

    const path = this.router.url.split('?')[0] || '/';
    this.seo.setPage({
      title: 'Página no encontrada',
      description: 'Esa dirección no existe. Puedes volver a cursos, viajes, la tienda o el contacto.',
      path,
      robots: 'noindex, follow',
    });
  }
}

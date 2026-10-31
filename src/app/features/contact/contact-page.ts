import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { buildWhatsAppUrl } from '../../core/contact/contact-links';
import { siteConfig } from '../../core/config/site.config';
import { SeoService } from '../../core/seo/seo.service';
import { DeferredEmbed } from '../../shared/deferred-embed';
import { Icon } from '../../shared/icon';
import { InquiryLink } from '../../shared/inquiry-link';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * @class ContactPage
 * @description Reúne dirección, teléfonos, correo, mapa y WhatsApp.
 */
@Component({
  selector: 'app-contact-page',
  imports: [DeferredEmbed, Icon, InquiryLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-page.html',
  host: { class: 'page' },
})
export class ContactPage {
  private readonly seo = inject(SeoService);

  /**
   * @description Datos de contacto verificados.
   */
  readonly site = siteConfig;

  /**
   * @description WhatsApp con el mensaje general.
   */
  readonly whatsapp = buildWhatsAppUrl();

  constructor() {
    this.seo.setPage({
      title: 'Contacto',
      description:
        'Calle 9 # 42-37, Cali. Teléfono, WhatsApp y correo de Arrecifes del Pacífico.',
      path: '/contacto',
      image: '/images/sede.jpg',
    });
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { buildWhatsAppUrl } from '../core/contact/contact-links';
import { siteConfig } from '../core/config/site.config';
import { Icon } from './icon';

/**
 * @class SiteFooter
 * @description Cierre del sitio con navegación, contacto y perfiles verificados.
 */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  /**
   * @description Configuración pública usada en el pie.
   */
  readonly site = siteConfig;

  /**
   * @description Año civil mostrado junto al aviso de derechos.
   */
  readonly year = new Date().getFullYear();

  /**
   * @description Enlace general de WhatsApp.
   */
  readonly whatsappHref = buildWhatsAppUrl();
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { buildWhatsAppUrl } from '../core/contact/contact-links';

/**
 * @class InquiryLink
 * @description Enlace a WhatsApp con un mensaje ya codificado.
 */
@Component({
  selector: 'a[appInquiry]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content /><span class="visually-hidden"> (se abre en una pestaña nueva)</span>`,
  host: {
    '[href]': 'href()',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
})
export class InquiryLink {
  /**
   * @description Mensaje que se envía al abrir el chat.
   */
  readonly message = input.required<string>();

  /**
   * @description URL de WhatsApp generada a partir del mensaje.
   */
  readonly href = computed(() => buildWhatsAppUrl(this.message()));
}

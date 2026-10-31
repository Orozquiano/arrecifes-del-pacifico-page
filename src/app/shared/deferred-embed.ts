import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MediaImage } from '../content/models';
import { Icon } from './icon';

/**
 * @class DeferredEmbed
 * @description Presenta una tarjeta de ubicación con dirección y acceso externo.
 * El mapa embebido no se usa como presentación principal: load no demuestra
 * disponibilidad y un fallo dejaría un rectángulo vacío.
 */
@Component({
  selector: 'app-deferred-embed',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './deferred-embed.html',
})
export class DeferredEmbed {
  /**
   * @description Título accesible de la ubicación.
   */
  readonly title = input.required<string>();

  /**
   * @description URL embebida. Conservada por compatibilidad; no se inserta el iframe.
   */
  readonly embedUrl = input.required<string>();

  /**
   * @description Enlace externo a Google Maps.
   */
  readonly externalUrl = input.required<string>();

  /**
   * @description Texto del enlace externo.
   */
  readonly externalLabel = input.required<string>();

  /**
   * @description Conservado por compatibilidad con plantillas existentes.
   */
  readonly actionLabel = input('Abrir en Google Maps');

  /**
   * @description Imagen previa. Opcional.
   */
  readonly poster = input<MediaImage | null>(null);

  /**
   * @description Nombre del lugar. Opcional.
   */
  readonly previewLabel = input<string | null>(null);

  /**
   * @description Detalle del lugar. Opcional.
   */
  readonly previewDetail = input<string | null>(null);

  /**
   * @description Conservado por compatibilidad. La tarjeta se muestra siempre.
   */
  readonly autoload = input(false);
}

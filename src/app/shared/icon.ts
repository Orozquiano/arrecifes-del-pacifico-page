import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * @typedef IconName
 * @description Iconos de interfaz y marcas usadas en el sitio.
 */
export type IconName =
  | 'whatsapp'
  | 'instagram'
  | 'youtube'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'play';

/**
 * @description Mapa de iconos genéricos a ligaduras de Material Symbols.
 */
const materialIcons: Partial<Record<IconName, string>> = {
  mail: 'mail',
  phone: 'call',
  pin: 'location_on',
  arrow: 'arrow_forward',
  menu: 'menu',
  close: 'close',
  play: 'play_arrow',
};

/**
 * @class Icon
 * @description Dibuja un icono de Material Symbols o la marca correspondiente.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-brand]': 'isBrand()',
    '[attr.data-icon]': 'name()',
  },
  template: `
    @if (materialName(); as symbol) {
      <span class="material-symbols-outlined" aria-hidden="true">{{ symbol }}</span>
    } @else {
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        @switch (name()) {
          @case ('whatsapp') {
            <path
              fill="currentColor"
              d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.82c2.17 0 4.2.84 5.73 2.37a8.07 8.07 0 0 1 2.37 5.72c0 4.47-3.63 8.1-8.1 8.1-1.42 0-2.8-.37-4.01-1.07l-.28-.16-3.12.82.83-3.04-.17-.3a8.07 8.07 0 0 1-1.26-4.35c0-4.47 3.64-8.1 8.11-8.1m4.52 10.45c-.2.56-1.16 1.03-1.61 1.1-.42.06-.95.09-1.53-.1-.35-.11-.8-.26-1.38-.5-2.43-1.05-4.01-3.49-4.13-3.65s-1-1.33-1-2.54.63-1.8.86-2.05c.22-.24.48-.3.65-.3h.47c.15 0 .34-.06.54.41s.69 1.69.75 1.81c.06.11.1.25.02.41s-.12.26-.24.4l-.36.42c-.12.12-.24.25-.1.48s.58.97 1.25 1.57c.86.77 1.59 1.01 1.81 1.12.23.12.36.1.49-.06.14-.16.57-.66.72-.89s.3-.19.51-.11 1.32.62 1.54.73c.23.12.38.17.44.27.05.1.05.55-.15 1.11"
            />
          }
          @case ('instagram') {
            <path
              fill="currentColor"
              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6"
            />
          }
          @case ('youtube') {
            <path
              fill="currentColor"
              d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8M9.75 15.5v-7l6.5 3.5z"
            />
          }
        }
      </svg>
    }
  `,
})
export class Icon {
  /**
   * @description Nombre del icono que se dibuja.
   */
  readonly name = input.required<IconName>();

  /**
   * @description Ligadura de Material Symbols cuando el icono es genérico.
   */
  readonly materialName = computed(() => materialIcons[this.name()] ?? null);

  /**
   * @description Indica si el icono es una marca con SVG propio.
   */
  readonly isBrand = computed(() => this.materialName() === null);
}

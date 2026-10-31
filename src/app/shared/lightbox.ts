import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MediaImage } from '../content/models';

/**
 * @class Lightbox
 * @description Amplía una fotografía de la galería en un diálogo con teclado y cierre por Escape.
 */
@Component({
  selector: 'app-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lightbox.html',
})
export class Lightbox implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private opener: HTMLElement | null = null;

  /**
   * @description Fotografías que se pueden recorrer.
   */
  readonly items = input.required<readonly MediaImage[]>();

  /**
   * @description Índice visible. Nulo cuando el diálogo está cerrado.
   */
  readonly activeIndex = signal<number | null>(null);

  /**
   * @description Anuncio breve para lectores de pantalla al cambiar de fotografía.
   */
  readonly liveMessage = computed(() => {
    const index = this.activeIndex();
    const total = this.items().length;
    if (index === null || total === 0) {
      return '';
    }
    return `Fotografía ${index + 1} de ${total}`;
  });

  constructor() {
    effect(() => {
      const index = this.activeIndex();
      const dialog = this.dialog()?.nativeElement;
      if (!dialog || !isPlatformBrowser(this.platformId)) {
        return;
      }

      const body = this.document.body;
      body.classList.toggle('lightbox-open', index !== null);

      if (index === null) {
        if (dialog.open) {
          dialog.close();
        }
        return;
      }

      if (!dialog.open) {
        dialog.showModal();
      }
    });
  }

  /**
   * @function ngOnDestroy
   * @description Cierra el diálogo y libera el desplazamiento de la página.
   */
  ngOnDestroy(): void {
    this.release();
  }

  /**
   * @function current
   * @description Obtiene la fotografía abierta.
   * @returns Imagen actual o nulo.
   */
  current(): MediaImage | null {
    const index = this.activeIndex();
    if (index === null) {
      return null;
    }
    return this.items()[index] ?? null;
  }

  /**
   * @function open
   * @description Abre el diálogo en la fotografía indicada.
   * @param index Posición dentro de la galería.
   */
  open(index: number): void {
    const active = this.document.activeElement;
    this.opener = active instanceof HTMLElement ? active : null;
    this.activeIndex.set(index);
  }

  /**
   * @function close
   * @description Cierra el diálogo y devuelve el foco al control que lo abrió.
   */
  close(): void {
    this.activeIndex.set(null);
  }

  /**
   * @function step
   * @description Recorre la galería hacia adelante o hacia atrás.
   * @param direction 1 para la siguiente o -1 para la anterior.
   */
  step(direction: 1 | -1): void {
    const index = this.activeIndex();
    const total = this.items().length;
    if (index === null || total === 0) {
      return;
    }
    this.activeIndex.set((index + direction + total) % total);
  }

  /**
   * @function backdrop
   * @description Cierra el diálogo si se activa el fondo y no la fotografía.
   * @param event Evento de puntero sobre el diálogo.
   */
  backdrop(event: MouseEvent): void {
    if (event.target === this.dialog()?.nativeElement) {
      this.close();
    }
  }

  /**
   * @function onDialogClose
   * @description Sincroniza el estado cuando el diálogo se cierra con Escape.
   */
  onDialogClose(): void {
    this.document.body.classList.remove('lightbox-open');
    if (this.activeIndex() !== null) {
      this.activeIndex.set(null);
    }
    const opener = this.opener;
    this.opener = null;
    opener?.focus();
  }

  /**
   * @function release
   * @description Quita el bloqueo del fondo y cierra el diálogo si sigue abierto.
   */
  private release(): void {
    this.document.body.classList.remove('lightbox-open');
    const dialog = this.dialog()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
  }
}

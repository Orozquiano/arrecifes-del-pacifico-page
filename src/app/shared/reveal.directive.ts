import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject } from '@angular/core';

/**
 * @class RevealDirective
 * @description Anima un bloque corto cuando entra en pantalla.
 * El contenido permanece visible por defecto: el estado previo a la animación
 * solo se aplica cuando el observador ya está listo en el navegador.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private motionQuery?: MediaQueryList;
  private readonly onMotionChange = () => {
    if (this.motionQuery?.matches) {
      this.reveal(this.element.nativeElement, false);
    }
  };

  constructor() {
    afterNextRender(() => this.prepare());
  }

  /**
   * @function ngOnDestroy
   * @description Deja de observar el bloque y la preferencia de movimiento.
   */
  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.motionQuery?.removeEventListener('change', this.onMotionChange);
  }

  /**
   * @function prepare
   * @description Decide si el bloque ya es visible, si es demasiado alto o si debe esperar.
   */
  private prepare(): void {
    const node = this.element.nativeElement;
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) {
      this.reveal(node, false);
      return;
    }

    if (typeof window.matchMedia === 'function') {
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.motionQuery.addEventListener('change', this.onMotionChange);
    }

    const reduced = this.motionQuery?.matches ?? false;
    if (reduced) {
      this.reveal(node, false);
      return;
    }

    document.documentElement.classList.add('js-motion');

    const rect = node.getBoundingClientRect();
    const tooTall = rect.height > window.innerHeight * 0.75;
    const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (tooTall || inView) {
      // En navegación SPA la entrada visible la lleva page-enter; no duplicar rise.
      const skipRise = this.isPageEntering() || Boolean(node.closest('.page-settled'));
      this.reveal(node, !skipRise && !tooTall);
      return;
    }

    // Solo oculta cuando ya podemos observar; si el bundle falla, nunca llega aquí.
    node.classList.add('reveal-pending');
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        const preferReduced = this.motionQuery?.matches ?? false;
        this.reveal(node, !preferReduced && !this.isPageEntering());
      },
      { threshold: 0.2, rootMargin: '0px' },
    );
    this.observer.observe(node);
  }

  /**
   * @function isPageEntering
   * @description Indica si la página está en transición de entrada coordinada.
   * @returns Verdadero cuando page-enter está pendiente o en curso.
   */
  private isPageEntering(): boolean {
    const root = document.documentElement;
    return (
      root.classList.contains('route-anim') ||
      root.classList.contains('is-routing') ||
      root.dataset['pageEnter'] === 'pending'
    );
  }

  /**
   * @function reveal
   * @description Muestra el bloque una sola vez y desconecta la observación.
   * @param node Elemento observado.
   * @param animate Indica si la aparición debe animarse.
   */
  private reveal(node: HTMLElement, animate: boolean): void {
    node.classList.toggle('reveal-static', !animate);
    node.classList.add('reveal-in');
    node.classList.remove('reveal-pending');
    this.observer?.disconnect();
    this.observer = undefined;
    this.motionQuery?.removeEventListener('change', this.onMotionChange);
    this.motionQuery = undefined;
  }
}

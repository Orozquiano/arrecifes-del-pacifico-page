import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationSkippedCode,
  NavigationStart,
  Router,
  Scroll,
} from '@angular/router';

/**
 * @class PageMotion
 * @description Coordina la entrada visual de cada página. El Router restaura el scroll
 * del historial y lleva las navegaciones nuevas al inicio; este servicio no compite
 * con esa posición, salvo el desplazamiento suave dentro de la misma ruta.
 */
@Injectable({ providedIn: 'root' })
export class PageMotion {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private settled = false;
  private motionToken = 0;
  private scrollToken = 0;
  private pendingEnter = false;
  private outgoingPage: Element | null = null;
  private motionQuery?: MediaQueryList;
  private readonly onMotionChange = () => this.syncMotion();

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.watchMotion();
    this.router.events.subscribe((event) => this.onRouterEvent(event));
  }

  /**
   * @function watchMotion
   * @description Activa o retira la clase de movimiento cuando cambia la preferencia del sistema.
   */
  private watchMotion(): void {
    if (typeof window.matchMedia !== 'function') {
      return;
    }
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.syncMotion();
    this.motionQuery.addEventListener('change', this.onMotionChange);
  }

  /**
   * @function syncMotion
   * @description Alinea la clase de la raíz con la preferencia actual.
   */
  private syncMotion(): void {
    const reduced = this.motionQuery?.matches ?? false;
    this.document.documentElement.classList.toggle('js-motion', !reduced);
    if (reduced) {
      this.pendingEnter = false;
      delete this.document.documentElement.dataset['pageEnter'];
      this.document.documentElement.classList.remove('route-anim');
    }
  }

  /**
   * @function scrollSamePageToTop
   * @description Sube al inicio solo cuando la persona permanece en la misma ruta.
   */
  private scrollSamePageToTop(): void {
    const token = ++this.scrollToken;
    const behavior: ScrollBehavior = this.motionQuery?.matches ? 'instant' : 'smooth';
    queueMicrotask(() => {
      if (token !== this.scrollToken) {
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior });
    });
  }

  /**
   * @function onRouterEvent
   * @description Aplica el lavado de fondo, la entrada de página y el foco sin alterar
   * la restauración de historial del Router.
   * @param event Evento de navegación o de scroll del enrutador.
   */
  private onRouterEvent(event: unknown): void {
    const root = this.document.documentElement;

    if (event instanceof NavigationStart) {
      const nextPath = pathOf(event.url);
      const samePage = nextPath === pathOf(this.router.url);
      const samePageFragment =
        event.navigationTrigger !== 'popstate' && samePage && event.url.includes('#');

      root.dataset['wash'] = topIsDeep(nextPath) ? 'deep' : 'light';

      this.scrollToken += 1;
      this.motionToken += 1;
      this.outgoingPage = this.document.querySelector('main .page');

      if (
        this.settled &&
        !samePageFragment &&
        event.navigationTrigger !== 'popstate'
      ) {
        root.classList.add('is-routing');
      } else {
        root.classList.remove('is-routing');
      }

      // Reserva la entrada para la vista nueva. data-page-enter cubre el hueco
      // entre is-routing y route-anim para no disparar rise anticipado.
      this.pendingEnter =
        this.settled &&
        event.navigationTrigger === 'imperative' &&
        !samePage &&
        !this.motionQuery?.matches;
      if (this.pendingEnter) {
        root.dataset['pageEnter'] = 'pending';
      } else {
        delete root.dataset['pageEnter'];
      }
      root.classList.remove('route-anim');
      return;
    }

    if (
      event instanceof NavigationCancel ||
      event instanceof NavigationError ||
      event instanceof NavigationSkipped
    ) {
      this.motionToken += 1;
      this.pendingEnter = false;
      this.outgoingPage = null;
      delete root.dataset['pageEnter'];
      root.classList.remove('is-routing', 'route-anim');

      if (
        event instanceof NavigationSkipped &&
        event.code === NavigationSkippedCode.IgnoredSameUrlNavigation &&
        this.settled &&
        !event.url.includes('#') &&
        window.scrollY > 0
      ) {
        this.scrollSamePageToTop();
      }
      return;
    }

    if (event instanceof NavigationEnd) {
      if (!root.dataset['wash']) {
        root.dataset['wash'] = topIsDeep(pathOf(event.urlAfterRedirects)) ? 'deep' : 'light';
      }
      if (!this.settled) {
        this.settled = true;
        root.classList.remove('is-routing');
      }
      if (this.pendingEnter) {
        const token = this.motionToken;
        this.pendingEnter = false;
        this.beginPageEnter(token);
      } else {
        this.outgoingPage = null;
      }
      return;
    }

    if (event instanceof Scroll) {
      const focusTarget = this.settled && !event.anchor && event.position === null;
      this.settled = true;
      queueMicrotask(() => {
        root.classList.remove('is-routing');
        if (!focusTarget) {
          return;
        }
        const main = this.document.getElementById('contenido');
        if (main instanceof HTMLElement) {
          main.focus({ preventScroll: true });
        }
      });
    }
  }

  /**
   * @function beginPageEnter
   * @description Activa la entrada cuando el DOM ya muestra la página de destino.
   * @param token Generación de la navegación que debe seguir vigente.
   * @param tries Intentos de encontrar la vista montada.
   */
  private beginPageEnter(token: number, tries = 0): void {
    requestAnimationFrame(() => {
      if (token !== this.motionToken) {
        return;
      }
      const root = this.document.documentElement;
      const page = this.document.querySelector('main .page');
      const stillOutgoing =
        this.outgoingPage !== null && page !== null && page === this.outgoingPage;

      if (!(page instanceof HTMLElement) || stillOutgoing) {
        if (tries >= 24) {
          this.outgoingPage = null;
          delete root.dataset['pageEnter'];
          return;
        }
        this.beginPageEnter(token, tries + 1);
        return;
      }

      this.outgoingPage = null;
      // Marca permanente en esta vista: al retirar route-anim no se reactiva rise.
      page.classList.add('page-settled');
      root.classList.add('route-anim');
      this.watchPageEnter(token);
    });
  }

  /**
   * @function endPageEnter
   * @description Retira la clase temporal de entrada sin rearmar animaciones locales.
   * @param token Generación de la navegación que debe seguir vigente.
   */
  private endPageEnter(token: number): void {
    if (token !== this.motionToken) {
      return;
    }
    const root = this.document.documentElement;
    root.classList.remove('route-anim');
    delete root.dataset['pageEnter'];
  }

  /**
   * @function watchPageEnter
   * @description Quita la clase de entrada cuando la animación termina, sin dejarla puesta.
   * @param token Generación de la navegación que debe seguir vigente.
   * @param tries Intentos de encontrar la animación ya pintada.
   */
  private watchPageEnter(token: number, tries = 0): void {
    requestAnimationFrame(() => {
      if (token !== this.motionToken) {
        return;
      }
      const root = this.document.documentElement;
      const page = this.document.querySelector('main .page');
      if (!root.classList.contains('route-anim') || !(page instanceof HTMLElement)) {
        this.endPageEnter(token);
        return;
      }
      const animation = page.getAnimations().find((item) => {
        return 'animationName' in item && item.animationName === 'page-enter';
      });
      if (!animation) {
        if (tries >= 8) {
          this.endPageEnter(token);
          return;
        }
        this.watchPageEnter(token, tries + 1);
        return;
      }
      if (animation.playState === 'finished') {
        this.endPageEnter(token);
        return;
      }
      void animation.finished.then(
        () => this.endPageEnter(token),
        () => this.endPageEnter(token),
      );
    });
  }
}

/**
 * @function pathOf
 * @description Obtiene la ruta sin consulta ni ancla.
 * @param url URL interna del enrutador.
 * @returns Ruta comparada entre páginas.
 */
export function pathOf(url: string): string {
  const path = url.split(/[?#]/)[0];
  return path === '' ? '/' : path;
}

/**
 * @function topIsDeep
 * @description Indica si la parte alta de la ruta usa el azul de la marca.
 * @param path Ruta sin consulta ni ancla.
 * @returns Verdadero en el inicio y en las fichas con fotografía.
 */
export function topIsDeep(path: string): boolean {
  return path === '/' || /^\/cursos\/[^/]+$/.test(path) || /^\/viajes\/[^/]+$/.test(path);
}

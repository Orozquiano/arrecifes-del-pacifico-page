import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { buildWhatsAppUrl } from '../core/contact/contact-links';
import { siteConfig } from '../core/config/site.config';
import { Icon } from './icon';

/**
 * @class SiteHeader
 * @description Encabezado fijo con la marca, la navegación y el acceso flotante a WhatsApp.
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
})
export class SiteHeader {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly menuPanel = viewChild<ElementRef<HTMLElement>>('menuPanel');
  private readonly indicator = viewChild<ElementRef<HTMLElement>>('indicator');
  private indicatorReady = false;
  private lastScrollLeft: number | null = null;
  private motionQuery?: MediaQueryList;

  /**
   * @description Nombre visible de la empresa.
   */
  readonly name = siteConfig.name;

  /**
   * @description Enlace general de WhatsApp.
   */
  readonly whatsappHref = buildWhatsAppUrl();

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (!isPlatformBrowser(this.platformId)) {
          return;
        }
        requestAnimationFrame(() => this.placeIndicator());
      });

    if (isPlatformBrowser(this.platformId) && typeof window.matchMedia === 'function') {
      const query = window.matchMedia('(max-width: 959px)');
      const sync = (): void => this.placeIndicator();
      sync();
      query.addEventListener('change', sync);
      this.destroyRef.onDestroy(() => query.removeEventListener('change', sync));

      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onMotion = (): void => this.placeIndicator(true);
      this.motionQuery.addEventListener('change', onMotion);
      this.destroyRef.onDestroy(() => this.motionQuery?.removeEventListener('change', onMotion));
    }

    afterNextRender(() => {
      this.placeIndicator();
      const panel = this.menuPanel()?.nativeElement;
      if (!panel || typeof ResizeObserver === 'undefined') {
        return;
      }
      const observer = new ResizeObserver(() => this.placeIndicator(true));
      observer.observe(panel);
      this.destroyRef.onDestroy(() => observer.disconnect());
      void this.document.fonts?.ready.then(() => this.placeIndicator(true));
    });
  }

  /**
   * @function placeIndicator
   * @description Mueve la marca del menú hasta el enlace de la página actual.
   * @param instant Fuerza desplazamiento sin animación. Opcional.
   */
  private placeIndicator(instant = false): void {
    const panel = this.menuPanel()?.nativeElement;
    const mark = this.indicator()?.nativeElement;
    if (!panel || !mark || !isPlatformBrowser(this.platformId)) {
      return;
    }

    const active = panel.querySelector<HTMLElement>('a.is-active');
    if (!active) {
      mark.style.width = '0px';
      return;
    }

    mark.style.transform = `translateX(${active.offsetLeft}px)`;
    mark.style.width = `${active.offsetWidth}px`;

    const overflow = panel.scrollWidth - panel.clientWidth;
    if (overflow > 0) {
      const centered = active.offsetLeft - (panel.clientWidth - active.offsetWidth) / 2;
      const nextLeft = Math.max(0, Math.min(centered, overflow));
      const reduced = this.motionQuery?.matches ?? false;
      if (this.lastScrollLeft === null || Math.abs(this.lastScrollLeft - nextLeft) > 2) {
        panel.scrollTo({
          left: nextLeft,
          behavior: instant || reduced || !this.indicatorReady ? 'instant' : 'smooth',
        });
        this.lastScrollLeft = nextLeft;
      }
    } else {
      this.lastScrollLeft = 0;
    }

    if (!this.indicatorReady) {
      this.indicatorReady = true;
      requestAnimationFrame(() => panel.classList.add('is-set'));
    }
  }
}

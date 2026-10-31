import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
  });

  it('muestra la navegación principal sin menú desplegable', async () => {
    const fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
    const panel = fixture.nativeElement.querySelector('#menu-principal') as HTMLElement;
    const toggle = fixture.nativeElement.querySelector('.menu-toggle');

    expect(panel).toBeTruthy();
    expect(toggle).toBeNull();
    expect(panel.querySelectorAll('a').length).toBe(6);
  });

  it('ofrece Inicio hacia la misma ruta que el logo', async () => {
    const fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
    const home = [...fixture.nativeElement.querySelectorAll('a')].find(
      (link: HTMLAnchorElement) => link.textContent?.trim() === 'Inicio',
    ) as HTMLAnchorElement;

    expect(home.getAttribute('href')).toBe('/');
  });

  it('muestra el acceso flotante a WhatsApp', async () => {
    const fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
    const float = fixture.nativeElement.querySelector('.whatsapp-float') as HTMLAnchorElement;

    expect(float).toBeTruthy();
    expect(float.textContent).toContain('WhatsApp');
    expect(float.getAttribute('href')).toContain('wa.me');
  });

  it('usa desplazamiento instantáneo del menú con movimiento reducido', async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = ((query: string) =>
      ({
        matches: String(query).includes('prefers-reduced-motion: reduce'),
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
        onchange: null,
      })) as typeof window.matchMedia;

    const scrollTo = vi.fn();
    const fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('#menu-principal') as HTMLElement;
    Object.defineProperty(panel, 'scrollWidth', { configurable: true, get: () => 640 });
    Object.defineProperty(panel, 'clientWidth', { configurable: true, get: () => 320 });
    panel.scrollTo = scrollTo;

    const active = panel.querySelector('a') as HTMLElement;
    active.classList.add('is-active');
    Object.defineProperty(active, 'offsetLeft', { configurable: true, get: () => 200 });
    Object.defineProperty(active, 'offsetWidth', { configurable: true, get: () => 80 });

    const header = fixture.componentInstance as unknown as {
      indicatorReady: boolean;
      lastScrollLeft: number | null;
      placeIndicator: (instant?: boolean) => void;
    };
    header.indicatorReady = true;
    header.lastScrollLeft = null;
    header.placeIndicator();

    expect(scrollTo).toHaveBeenCalled();
    const options = scrollTo.mock.calls.at(-1)?.[0] as ScrollToOptions;
    expect(options.behavior).toBe('instant');

    window.matchMedia = originalMatchMedia;
  });
});

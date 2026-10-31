import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DeferredEmbed } from './deferred-embed';

describe('DeferredEmbed', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferredEmbed],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('muestra la tarjeta de ubicación y el acceso externo sin iframe', async () => {
    const fixture = TestBed.createComponent(DeferredEmbed);
    fixture.componentRef.setInput('title', 'Mapa de la sede');
    fixture.componentRef.setInput('embedUrl', 'https://www.google.com/maps/embed?pb=blocked');
    fixture.componentRef.setInput('externalUrl', 'https://example.com/maps');
    fixture.componentRef.setInput('externalLabel', 'Abrir en Google Maps');
    fixture.componentRef.setInput('previewLabel', 'Arrecifes del Pacífico');
    fixture.componentRef.setInput('previewDetail', 'Calle 9 # 42-37, Cali, Colombia');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Arrecifes del Pacífico');
    expect(text).toContain('Calle 9 # 42-37, Cali, Colombia');
    expect(text).toContain('Abrir en Google Maps');
    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
    expect(fixture.nativeElement.querySelector('.embed-fallback')).toBeTruthy();
  });

  it('no deja un rectángulo de mapa vacío con autoload', async () => {
    const fixture = TestBed.createComponent(DeferredEmbed);
    fixture.componentRef.setInput('title', 'Mapa de la sede');
    fixture.componentRef.setInput('embedUrl', 'https://www.google.com/maps/embed?pb=blocked');
    fixture.componentRef.setInput('externalUrl', 'https://example.com/maps');
    fixture.componentRef.setInput('externalLabel', 'Abrir en Google Maps');
    fixture.componentRef.setInput('autoload', true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Abrir en Google Maps');
  });
});

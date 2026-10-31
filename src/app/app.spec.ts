import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
  });

  it('crea la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra la marca en el encabezado', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const brand = fixture.nativeElement.querySelector('.brand') as HTMLAnchorElement;
    expect(brand.getAttribute('aria-label')).toContain('Arrecifes del Pacífico');
    expect(brand.getAttribute('href')).toBe('/');
  });
});

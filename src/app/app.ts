import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageMotion } from './core/navigation/page-motion';
import { SeoService } from './core/seo/seo.service';
import { TripCalendar } from './core/trips/trip-calendar';
import { SiteFooter } from './shared/site-footer';
import { SiteHeader } from './shared/site-header';

/**
 * @class App
 * @description Compone el encabezado, las páginas y el pie del sitio público.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(SeoService).installBusinessGraph();
    inject(TripCalendar);
    inject(PageMotion);
  }
}

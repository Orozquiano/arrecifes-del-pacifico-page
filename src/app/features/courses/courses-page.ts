import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
import { coursesByGroup } from '../../content/courses';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * @class CoursesPage
 * @description Lista los cursos publicados y separa el inicio de la continuación.
 */
@Component({
  selector: 'app-courses-page',
  imports: [RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-page.html',
  host: { class: 'page' },
})
export class CoursesPage {
  private readonly seo = inject(SeoService);

  /**
   * @description Cursos para quien empieza.
   */
  readonly starting = coursesByGroup('empezar');

  /**
   * @description Cursos para quien continúa.
   */
  readonly continuing = coursesByGroup('continuar');

  constructor() {
    this.seo.setPage({
      title: 'Cursos de natación y buceo',
      description:
        'Natación, Skin Diver, Open Water, Advanced, especialidades y Freediver NAUI en Cali. Consulta cada programa con Arrecifes del Pacífico.',
      path: '/cursos',
    });
  }
}

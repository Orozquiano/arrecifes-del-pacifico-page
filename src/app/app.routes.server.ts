import { RenderMode, ServerRoute } from '@angular/ssr';
import { courses } from './content/courses';
import { trips } from './content/trips';

const paginasEstaticas = ['', 'cursos', 'viajes', 'nosotros', 'tienda', 'contacto'] as const;

export const serverRoutes: ServerRoute[] = [
  ...paginasEstaticas.map(
    (path): ServerRoute => ({
      path,
      renderMode: RenderMode.Prerender,
    }),
  ),
  {
    path: 'cursos/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return courses.map((course) => ({ slug: course.slug }));
    },
  },
  {
    path: 'viajes/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return trips.map((trip) => ({ slug: trip.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];

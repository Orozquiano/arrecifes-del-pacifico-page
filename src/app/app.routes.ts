import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page').then((module) => module.HomePage),
  },
  {
    path: 'cursos',
    loadComponent: () => import('./features/courses/courses-page').then((module) => module.CoursesPage),
  },
  {
    path: 'cursos/:slug',
    loadComponent: () =>
      import('./features/courses/course-detail-page').then((module) => module.CourseDetailPage),
  },
  {
    path: 'viajes',
    loadComponent: () => import('./features/trips/trips-page').then((module) => module.TripsPage),
  },
  {
    path: 'viajes/:slug',
    loadComponent: () =>
      import('./features/trips/trip-detail-page').then((module) => module.TripDetailPage),
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/about/about-page').then((module) => module.AboutPage),
  },
  {
    path: 'tienda',
    loadComponent: () => import('./features/store/store-page').then((module) => module.StorePage),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact-page').then((module) => module.ContactPage),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found-page').then((module) => module.NotFoundPage),
  },
];

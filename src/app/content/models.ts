/**
 * @interface MediaImage
 * @description Fotografía o gráfico local, con dimensiones para reservar espacio.
 */
export interface MediaImage {
  /**
   * @description Ruta pública del archivo.
   */
  src: string;

  /**
   * @description Texto alternativo de la imagen.
   */
  alt: string;

  /**
   * @description Ancho intrínseco en píxeles.
   */
  width: number;

  /**
   * @description Alto intrínseco en píxeles.
   */
  height: number;
}

/**
 * @interface Course
 * @description Curso publicado por la empresa, con los datos que sí están documentados.
 */
export interface Course {
  /**
   * @description Identificador usado en la ruta.
   */
  slug: string;

  /**
   * @description Nombre visible del curso.
   */
  name: string;

  /**
   * @description Grupo de navegación: inicio de la formación o continuación.
   */
  group: 'empezar' | 'continuar';

  /**
   * @description Frase breve tomada de la presentación del curso.
   */
  lead: string;

  /**
   * @description Resumen de una o dos frases para listados.
   */
  summary: string;

  /**
   * @description Desarrollo del curso.
   */
  paragraphs: readonly string[];

  /**
   * @description Temas que el material publicado dice que se trabajan.
   */
  topics: readonly string[];

  /**
   * @description Forma de realización documentada.
   */
  format: readonly string[];

  /**
   * @description Elementos incluidos en el folleto, si existe.
   */
  includes: readonly string[];

  /**
   * @description Elementos que el folleto deja por fuera.
   */
  excludes: readonly string[];

  /**
   * @description Tarifas publicadas. Vacío cuando no hay una cifra comprobada.
   */
  investment: readonly string[];

  /**
   * @description Requisitos de ingreso o de certificación que sí aparecen en el material.
   */
  requirements: readonly string[];

  /**
   * @description Aclaraciones y condiciones publicadas.
   */
  notes: readonly string[];

  /**
   * @description Datos que el material revisado no precisa.
   */
  gaps: readonly string[];

  /**
   * @description Imagen de apoyo. No implica que las personas sean alumnos de ese curso.
   */
  image: MediaImage;

  /**
   * @description Folleto original, cuando corresponde a este curso.
   */
  brochureUrl?: string;
}

/**
 * @typedef TripPhase
 * @description Situación de una salida respecto a la fecha de consulta.
 */
export type TripPhase = 'programada' | 'en-curso' | 'realizada';

/**
 * @interface Trip
 * @description Salida con folleto, fechas y servicios publicados.
 */
export interface Trip {
  /**
   * @description Identificador usado en la ruta.
   */
  slug: string;

  /**
   * @description Destino principal.
   */
  destination: string;

  /**
   * @description Título de la salida.
   */
  title: string;

  /**
   * @description Fecha inicial en formato AAAA-MM-DD.
   */
  start: string;

  /**
   * @description Fecha final en formato AAAA-MM-DD.
   */
  end: string;

  /**
   * @description Situación al publicar esta versión, el 30 de octubre de 2026.
   */
  phaseAtPublication: TripPhase;

  /**
   * @description Resumen para listados.
   */
  summary: string;

  /**
   * @description Descripción del destino y del programa.
   */
  paragraphs: readonly string[];

  /**
   * @description Itinerario publicado. Vacío si el folleto no lo detalla.
   */
  itinerary: readonly string[];

  /**
   * @description Servicios incluidos en el folleto.
   */
  includes: readonly string[];

  /**
   * @description Lo que el folleto no incluye.
   */
  excludes: readonly string[];

  /**
   * @description Requisitos publicados.
   */
  requirements: readonly string[];

  /**
   * @description Tarifas del folleto.
   */
  fares: readonly string[];

  /**
   * @description Nombre de la embarcación cuando el folleto es consistente.
   */
  vessel?: string;

  /**
   * @description Aclaración cuando las fuentes no coinciden.
   */
  vesselNote?: string;

  /**
   * @description Condiciones de pago o cancelación publicadas.
   */
  notes: readonly string[];

  /**
   * @description Imagen de la salida o fotografía de contexto.
   */
  image: MediaImage;

  /**
   * @description PDF original de la salida.
   */
  brochureUrl: string;
}

/**
 * @interface TripMention
 * @description Experiencia mencionada en redes, sin folleto suficiente para una ficha.
 */
export interface TripMention {
  /**
   * @description Título de la mención.
   */
  title: string;

  /**
   * @description Qué se pudo comprobar y qué no.
   */
  text: string;

  /**
   * @description Enlace a la fuente.
   */
  href: string;
}

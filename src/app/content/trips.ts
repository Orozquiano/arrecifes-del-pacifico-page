import { siteConfig } from '../core/config/site.config';
import { Trip, TripMention } from './models';

const gorgonaLife =
  'El folleto describe el Parque Nacional Natural Isla Gorgona como un destino del Pacífico, a unos 160 km de Buenaventura, de cerca de 9 km de largo y 2,5 km de ancho. Menciona que se puede avistar meros, loros, morenas, pargos, jureles, tortugas y tiburones aletiblanco y, con más suerte, tiburón ballena, rayas o mantas. Esos encuentros no están garantizados.';

const gorgonaItinerary = [
  'Día 1. Traslado terrestre de Cali a Buenaventura, embarque, charla de seguridad durante la cena y zarpe alrededor de las 8:00 p. m.',
  'Día 2. Si la navegación lo permite, arribo hacia las 6:00 a. m., desayuno, charla de Parques Nacionales en la isla y jornada con 3 buceos diurnos y uno nocturno para avanzados.',
  'Día 3. Tres buceos diurnos y uno nocturno, con alimentación y alojamiento a bordo.',
  'Día 4. Tres buceos diurnos, visita a la antigua prisión, piscina natural y playa. Zarpe hacia Buenaventura a las 6:00 p. m.',
  'Día 5. Arribo a Buenaventura alrededor de las 5:00 a. m., desayuno a bordo y traslado terrestre a Cali.',
] as const;

const gorgonaSharedIncludes = [
  'Transporte terrestre Cali–Buenaventura–Cali.',
  'Transporte marítimo Buenaventura–Gorgona–Buenaventura.',
  'Pago de impuestos al Ministerio.',
  'Alimentación completa: desayunos, almuerzos y cenas.',
  'Refrigerios y snacks.',
  '9 inmersiones diurnas con nitrox.',
  '2 inmersiones nocturnas para buzos avanzados, con nitrox.',
  'Servicio de bote y guía para todos los buceos.',
  'Tanque de buceo con aire y plomos.',
  'Equipo de buceo, chaleco y regulador, para alumnos que se certifiquen.',
  'Visita al antiguo penal.',
  'Seguro de viaje de buceo.',
  'Souvenir.',
] as const;

const gorgonaExcludes = [
  'Propinas. El folleto recomienda desde $100.000 por persona.',
  'Traje de neopreno: $45.000 diarios, por 3 días de buceo.',
  'Equipo para quien no esté en certificación: $45.000 el chaleco y $45.000 el regulador, por día.',
] as const;

const gorgonaFares = [
  'Habitación doble o sencilla: $4.430.000 por persona.',
  'Buzo extranjero: $1.500.000 adicionales de impuesto.',
] as const;

const gorgonaNotes = [
  'El folleto pide el 50 % para reservar y el 50 % un mes antes de la salida.',
  'También publica penalidades: 50 % con aviso entre 60 y 90 días antes, 70 % entre 30 y 60 días, y sin reintegro si se cancela a menos de 30 días. Hay cláusulas distintas para situaciones médicas, cupo mínimo y caso fortuito. El texto completo está en el PDF.',
  'Los folletos incluyen cuentas bancarias. No se reproducen aquí: confirma los datos de pago directamente con la empresa o en el PDF.',
] as const;

const contextPhoto = {
  src: '/images/naufragio.webp',
  alt: 'Buzos en una estructura sumergida. Fotografía de la empresa; no está identificada como toma de esta salida.',
  width: 1920,
  height: 800,
} as const;

const reefContext = {
  src: '/images/buzo-camara.webp',
  alt: 'Buzo con cámara en un arrecife. Fotografía de la empresa; no está identificada como toma de Providencia.',
  width: 1920,
  height: 800,
} as const;

const providenciaParagraphs = [
  'La empresa describe Providencia como un destino de aguas cristalinas, temperatura cálida y poca corriente. El folleto dice que gran parte de sus aguas han sido declaradas área protegida por la Unesco y asocia el nombre Mar de los Siete Colores a los arrecifes.',
  'El programa publicado combina alojamiento, buceo y un tour a Cayo Cangrejo. Los tiquetes aéreos no están incluidos.',
] as const;

const providenciaIncludes = [
  'Alojamiento de 4 noches en acomodación doble o triple.',
  'Alimentación: 4 desayunos, 4 almuerzos y 1 cena.',
  'Snacks entre inmersiones.',
  '6 inmersiones diurnas.',
  '1 inmersión nocturna para buzos avanzados.',
  'Servicio de bote y guía para todos los buceos.',
  'Tanque con aire y plomos.',
  'Equipo de buceo: chaleco y regulador.',
  'Seguro de viaje de buceo.',
  'Kit Arrecifes.',
  'Tour a Cayo Cangrejo, con snorkeling.',
] as const;

const providenciaFares = [
  'Habitación doble o múltiple.',
  'Buzo Open Water: $3.320.000.',
  'Buzo avanzado: $3.590.000.',
  'Turista: $2.430.000.',
] as const;

const providenciaNotes = [
  'El folleto pide el 50 % para reservar y el 50 % un mes antes.',
  'Publica las mismas ventanas de penalidad que los folletos de Gorgona y aclara que las demás cenas, además de la incluida, no hacen parte del programa. Revisa el PDF antes de tomar una decisión.',
] as const;

/**
 * @description Salidas con folleto, fechas y servicios comprobados.
 */
export const trips: readonly Trip[] = [
  {
    slug: 'gorgona-octubre-2026',
    destination: 'Gorgona',
    title: 'Gorgona, octubre de 2026',
    start: '2026-10-30',
    end: '2026-11-03',
    phaseAtPublication: 'en-curso',
    summary: 'Vida a bordo y buceo con nitrox en el Parque Nacional Natural Isla Gorgona.',
    paragraphs: [
      'Fechas publicadas: 30 de octubre al 3 de noviembre de 2026. Es un programa de vida a bordo, con cuatro noches y buceo con nitrox.',
      gorgonaLife,
    ],
    itinerary: gorgonaItinerary,
    includes: ['Alojamiento de 4 noches a bordo.', ...gorgonaSharedIncludes],
    excludes: gorgonaExcludes,
    requirements: [
      'Ser buzo certificado y tener licencia Nitrox.',
      'El folleto ofrece un curso Nitrox NAUI en línea más licencia por $750.000, como precio especial para esta salida.',
    ],
    fares: gorgonaFares,
    vesselNote:
      'El relato del folleto menciona el barco Vivax y el listado de incluidos indica el barco Ferox. El archivo también se llama Ferox. Confirma la embarcación con el equipo.',
    notes: gorgonaNotes,
    image: {
      src: '/images/gorgona-octubre.jpg',
      alt: 'Afiche de la salida a Gorgona del 30 de octubre al 3 de noviembre de 2026, con una ballena frente a una costa.',
      width: 545,
      height: 545,
    },
    brochureUrl:
      'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Gorgona-Octubre-2026-Ferox.pdf',
  },
  {
    slug: 'gorgona-abril-2026',
    destination: 'Gorgona',
    title: 'Gorgona, abril de 2026',
    start: '2026-04-24',
    end: '2026-04-28',
    phaseAtPublication: 'realizada',
    summary: 'Salida ya realizada al Parque Nacional Natural Isla Gorgona, a bordo del Vivax.',
    paragraphs: [
      'Fechas publicadas: 24 al 28 de abril de 2026. El programa era de vida a bordo y buceo con nitrox.',
      gorgonaLife,
    ],
    itinerary: gorgonaItinerary,
    includes: ['Alojamiento de 4 noches en el barco Vivax.', ...gorgonaSharedIncludes],
    excludes: gorgonaExcludes,
    requirements: [
      'Ser buzo certificado y tener licencia Nitrox.',
      'El folleto ofrecía un curso Nitrox NAUI en línea más licencia por $750.000, como precio especial de esa salida.',
    ],
    fares: gorgonaFares,
    vessel: 'Vivax',
    notes: gorgonaNotes,
    image: contextPhoto,
    brochureUrl:
      'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Gorgona-Abril-2026-Vivax.pdf',
  },
  {
    slug: 'gorgona-marzo-2026',
    destination: 'Gorgona',
    title: 'Gorgona, marzo de 2026',
    start: '2026-03-27',
    end: '2026-03-31',
    phaseAtPublication: 'realizada',
    summary: 'Salida ya realizada al Parque Nacional Natural Isla Gorgona, a bordo del Vivax.',
    paragraphs: [
      'Fechas publicadas: 27 al 31 de marzo de 2026. El programa era de vida a bordo y buceo con nitrox.',
      gorgonaLife,
    ],
    itinerary: gorgonaItinerary,
    includes: ['Alojamiento de 4 noches en el barco Vivax.', ...gorgonaSharedIncludes],
    excludes: gorgonaExcludes,
    requirements: [
      'Tener licencia Nitrox. A diferencia de los otros folletos de Gorgona, este no repite de forma explícita la frase “ser buzo certificado”.',
      'El folleto ofrecía un curso Nitrox NAUI en línea más licencia por $750.000, como precio especial de esa salida.',
    ],
    fares: gorgonaFares,
    vessel: 'Vivax',
    notes: gorgonaNotes,
    image: {
      ...contextPhoto,
      src: '/images/buzos-arrecife.webp',
      alt: 'Dos buzos sobre un arrecife. Fotografía de la empresa; no está identificada como toma de esta salida.',
    },
    brochureUrl:
      'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Gorgona-Marzo-2026-Vivax.pdf',
  },
  {
    slug: 'providencia-junio-2026',
    destination: 'Providencia',
    title: 'Providencia, junio de 2026',
    start: '2026-06-25',
    end: '2026-06-29',
    phaseAtPublication: 'realizada',
    summary: 'Salida ya realizada a Providencia, con buceo y tour a Cayo Cangrejo.',
    paragraphs: [
      'Fechas publicadas: 25 al 29 de junio de 2026.',
      ...providenciaParagraphs,
    ],
    itinerary: [],
    includes: providenciaIncludes,
    excludes: [
      'Tiquetes aéreos.',
      'Tarjeta de turismo: $153.000, según este folleto.',
      'Las cenas que no estén entre lo incluido.',
      'Propinas.',
      'Equipos o ítems no especificados en el programa.',
    ],
    requirements: [],
    fares: providenciaFares,
    notes: providenciaNotes,
    image: reefContext,
    brochureUrl: 'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Providencia-Junio-2026.pdf',
  },
  {
    slug: 'providencia-abril-2026',
    destination: 'Providencia',
    title: 'Providencia, Semana Santa 2026',
    start: '2026-04-01',
    end: '2026-04-05',
    phaseAtPublication: 'realizada',
    summary: 'Salida ya realizada a Providencia en Semana Santa, con buceo y tour a Cayo Cangrejo.',
    paragraphs: [
      'Fechas publicadas: 1 al 5 de abril de 2026. El folleto la presenta como Semana Santa en Providencia.',
      ...providenciaParagraphs,
    ],
    itinerary: [],
    includes: providenciaIncludes,
    excludes: [
      'Tiquetes aéreos.',
      'Tarjeta de turismo: $146.000, según este folleto.',
      'Las cenas que no estén entre lo incluido.',
      'Propinas.',
      'Equipos o ítems no especificados en el programa.',
    ],
    requirements: [],
    fares: providenciaFares,
    notes: providenciaNotes,
    image: {
      ...reefContext,
      src: '/images/hero-arrecife.webp',
      width: 1920,
      height: 1080,
    },
    brochureUrl:
      'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Providencia-Abril-2026.pdf',
  },
];

/**
 * @description Experiencias visibles en redes, sin datos suficientes para una ficha.
 */
export const tripMentions: readonly TripMention[] = [
  {
    title: 'Egipto, octubre de 2026',
    text: 'En octubre de 2026 el equipo estuvo en Egipto, con publicaciones desde Luxor y el mar Rojo. Si quieres un próximo viaje, escríbenos.',
    href: siteConfig.instagramUrl,
  },
];

/**
 * @function findTrip
 * @description Busca una salida por el identificador de su ruta.
 * @param slug Identificador de la salida. Puede no existir.
 * @returns Salida encontrada o indefinida.
 */
export function findTrip(slug: string | null | undefined): Trip | undefined {
  if (!slug) {
    return undefined;
  }

  return trips.find((trip) => trip.slug === slug);
}

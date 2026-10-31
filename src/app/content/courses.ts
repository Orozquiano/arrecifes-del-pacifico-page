import { Course } from './models';

const sedeImage = {
  src: '/images/sede.jpg',
  alt: 'Fachada de la sede de Arrecifes del Pacífico en Cali. El aviso incluye natación, equipos, buceo y viajes.',
  width: 796,
  height: 1280,
} as const;

const diversImage = {
  src: '/images/buzos-arrecife.webp',
  alt: 'Dos buzos con equipo autónomo recorren un arrecife de coral.',
  width: 1920,
  height: 800,
} as const;

const reefImage = {
  src: '/images/hero-arrecife.webp',
  alt: 'Dos buzos entre formaciones de coral, en una fotografía publicada por la empresa.',
  width: 1920,
  height: 1080,
} as const;

const wreckImage = {
  src: '/images/naufragio.webp',
  alt: 'Buzos recorren una estructura sumergida cubierta de coral.',
  width: 1920,
  height: 800,
} as const;

const cameraImage = {
  src: '/images/buzo-camara.webp',
  alt: 'Buzo con cámara junto a una estructura sumergida. Fotografía publicada por la empresa.',
  width: 1920,
  height: 800,
} as const;

const courseTerms =
  'El folleto indica que no hay devoluciones totales o parciales por cursos pagos y no tomados, que reprogramar una clase ausente tiene un costo y que el pago tiene vigencia de un año. El detalle está en el PDF.';

/**
 * @description Cursos identificados en el sitio y en los folletos publicados.
 */
export const courses: readonly Course[] = [
  {
    slug: 'natacion',
    name: 'Natación',
    group: 'empezar',
    lead: 'Domina el agua y disfruta la libertad.',
    summary:
      'Clases para desarrollar habilidad en el agua, con una metodología que la empresa describe como lúdica.',
    paragraphs: [
      'Las clases de natación buscan que cada alumno gane confianza y aprenda los estilos de forma entretenida, con hábitos que siguen después de la clase.',
    ],
    topics: [],
    format: [],
    includes: [],
    excludes: [],
    investment: [],
    requirements: [],
    notes: [
      'La sede anuncia natación junto con equipos, buceo y viajes. No hay una fotografía de las clases en el material revisado.',
    ],
    gaps: ['Edad mínima', 'Duración', 'Tarifa', 'Certificación'],
    image: sedeImage,
  },
  {
    slug: 'skin-diver',
    name: 'Skin Diver',
    group: 'empezar',
    lead: 'El arte de sumergirte en libertad.',
    summary:
      'Paso del snorkeling a la inmersión en apnea, con certificado internacional según el folleto.',
    paragraphs: [
      'El curso trabaja la apnea y el manejo del equipo básico para sumergirse con la propia respiración. La presentación de la empresa lo describe como el tránsito del snorkeling a una inmersión en arrecifes o ríos.',
      'El folleto dice que la formación prepara para certificarse en río o mar y que, con la práctica, las apneas se alargan.',
    ],
    topics: [
      'La apnea y la condición física y mental.',
      'Careta, snorkel, aletas, sistema de peso y equipos de protección.',
      'Efectos de la presión durante las inmersiones en apnea.',
      'Primeros auxilios y rescate básico de buceo a pulmón.',
      'El medio ambiente subacuático y el cuidado de los océanos.',
    ],
    format: [
      '4 sesiones teóricas en salón, de aproximadamente 2 horas cada una.',
      '4 sesiones prácticas en piscina, de aproximadamente 2 horas cada una.',
      'Día adicional de apnea y acondicionamiento, descrito como servicio opcional.',
    ],
    includes: [
      'Teoría en salón con videobeam, aire acondicionado y refrigerio.',
      'Servicio de piscina para las clases.',
      'Paquete de estudio: bolsa, lapicero, carpeta de registro y manual digital NAUI.',
      'Préstamo del equipo para las 4 prácticas y la salida de certificación, excepto las clases opcionales.',
    ],
    excludes: [
      'Costo de la salida de certificación a río, lago o mar.',
      'Trámite de la licencia NAUI: USD $35.',
    ],
    investment: ['$550.000, según el folleto.'],
    requirements: [],
    notes: [
      'La fotografía de apoyo es de buceo autónomo y no documenta una clase de apnea.',
      courseTerms,
    ],
    gaps: ['Edad mínima'],
    image: diversImage,
    brochureUrl: 'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Skin-Diver-.pdf',
  },
  {
    slug: 'open-water-diver',
    name: 'Open Water Diver',
    group: 'empezar',
    lead: 'Tu pasaporte al océano.',
    summary:
      'Formación para bucear con equipo autónomo y obtener una certificación internacional.',
    paragraphs: [
      'El curso presenta el buceo autónomo: usar el equipo, responder ante una situación y permanecer bajo el agua para ver el entorno marino. La empresa lo ofrece como entrenamiento en salón y piscina, con salida de certificación aparte.',
      'El folleto dice que la formación prepara para certificarse en el mar hasta 18 metros. También nombra, como destinos posibles después de certificarse, Gorgona, San Andrés, Providencia, Malpelo, Islas del Rosario, el mar Rojo y Maldivas. Esos lugares no están incluidos en el valor del curso.',
    ],
    topics: [
      'El buceo y la condición física y mental.',
      'Equipo básico, equipo autónomo y destrezas para usarlo.',
      'Efectos de la presión durante las inmersiones.',
      'Planificación de los buceos.',
      'Primeros auxilios y rescate básico.',
      'El medio ambiente subacuático y el cuidado de los océanos.',
    ],
    format: [
      '6 sesiones teóricas en salón, de aproximadamente 2 horas cada una.',
      '6 sesiones prácticas en piscina, de aproximadamente 2 horas y media cada una.',
      'La primera práctica trabaja apnea básica. Desde la segunda se hacen 5 inmersiones con equipo autónomo.',
      'Día adicional de apnea y acondicionamiento, descrito como servicio opcional.',
    ],
    includes: [
      'Teoría en salón con videobeam, aire acondicionado y refrigerio.',
      'Servicio de piscina para las clases.',
      'Paquete de estudio: bolsa, lapicero, carpeta de registro y manual físico PADI o manual digital NAUI.',
      'Préstamo del equipo para las 6 prácticas formales y la salida de certificación con la empresa.',
      'Seguro DAN hasta por USD $25.000 para tratamiento de descompresión, por 6 meses o hasta la última inmersión de certificación, lo que ocurra primero.',
    ],
    excludes: [
      'Costo de la salida de certificación al mar o a aguas abiertas.',
      'Trámite de la licencia PADI o NAUI: USD $55.',
    ],
    investment: ['Grupo: $1.200.000.', 'Personalizado: $1.540.000.'],
    requirements: [],
    notes: [courseTerms],
    gaps: ['Edad mínima'],
    image: diversImage,
    brochureUrl: 'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Open-Water.pdf',
  },
  {
    slug: 'advanced-open-water',
    name: 'Advanced Open Water',
    group: 'continuar',
    lead: 'Desbloquea nuevas profundidades.',
    summary:
      'Continuación para quien ya es buzo Open Water. El folleto amplía sitios, equipo y cinco líneas de práctica.',
    paragraphs: [
      'La empresa presenta este nivel como el paso siguiente de un buzo certificado: nuevos entornos y una idea más clara del tipo de buceo que le interesa.',
      'El folleto se dirige a quien ya vivió el Open Water. Dice que el entrenamiento prepara para certificarse en el mar a más de 30 metros.',
    ],
    topics: [
      'Buceo profundo.',
      'Navegación subacuática con referencias naturales y con brújula.',
      'Dominio de la flotabilidad.',
      'Buceo nocturno.',
      'Búsqueda y recuperación subacuática.',
    ],
    format: [
      '5 sesiones teóricas en salón, de aproximadamente 2 horas cada una.',
      '5 sesiones prácticas en piscina, de aproximadamente 2 horas y media cada una.',
      'Día adicional de apnea y acondicionamiento, descrito como servicio opcional.',
    ],
    includes: [
      'Teoría en salón con videobeam, aire acondicionado y refrigerio.',
      'Servicio de piscina para las clases.',
      'Paquete de estudio: bolsa, lapicero, carpeta de registro y manual físico PADI o manual digital NAUI.',
      'Préstamo del equipo para las 5 prácticas formales y la salida de certificación, excepto las clases opcionales.',
    ],
    excludes: [
      'Costo de la salida de certificación al mar o a aguas abiertas.',
      'Trámite de la licencia PADI o NAUI: USD $60.',
    ],
    investment: ['$1.200.000, según el folleto.'],
    requirements: [
      'El folleto está escrito para quien ya cursó Open Water. No publica otros requisitos en el texto revisado.',
    ],
    notes: [courseTerms],
    gaps: ['Edad mínima'],
    image: reefImage,
    brochureUrl:
      'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/Advanced-Open-Water-1.pdf',
  },
  {
    slug: 'especialidades',
    name: 'Especialidades',
    group: 'continuar',
    lead: 'Elige el siguiente desafío.',
    summary:
      'Programas para seguir después de la formación inicial. La página nombra Nitrox, sidemount, buceo técnico y liderazgo.',
    paragraphs: [
      'Si ya buceas, puedes seguir con Nitrox, sidemount, buceo técnico o la formación para guiar a otros buzos. Cuéntanos cuál te interesa y te explicamos cómo se hace.',
    ],
    topics: ['Nitrox.', 'Sidemount.', 'Buceo técnico.', 'Formación para guiar a otros buzos.'],
    format: [],
    includes: [],
    excludes: [],
    investment: [],
    requirements: [],
    notes: [
      'Los folletos de Gorgona publican un curso Nitrox NAUI en línea más licencia por $750.000, como precio especial ligado a ese viaje. Confirma si aplica a tu caso: no es la tarifa general de todas las especialidades.',
    ],
    gaps: ['Duración', 'Requisitos de cada especialidad', 'Tarifas, salvo la mención de Nitrox en los viajes a Gorgona'],
    image: wreckImage,
  },
  {
    slug: 'freediver-naui',
    name: 'Freediver NAUI',
    group: 'continuar',
    lead: 'Apnea con el programa NAUI publicado por la empresa.',
    summary:
      'Curso de apnea de dos meses. El folleto exige experiencia previa de apnea o Skin Diver y ser mayor de 15 años.',
    paragraphs: [
      'Es un entrenamiento de apnea con NAUI: seguridad, gestión de problemas y técnica para permanecer más tiempo bajo el agua. No forma parte de las clases de estilos de natación.',
      'Las prácticas se extienden durante dos meses e incluyen yoga, según el folleto. Hay una salida de preparación en Lago Calima y la certificación en aguas abiertas está prevista en San Andrés. Esas salidas y la licencia no entran en el valor del curso.',
    ],
    topics: [
      'Equipos de apnea.',
      'Seguridad y problemas en apnea.',
      'Respiración, reducción del estrés, física y fisiología.',
      'Métodos de compensación para apnea profunda.',
      'Tablas de oxígeno y dióxido de carbono.',
    ],
    format: [
      'Cuatro sesiones teóricas.',
      'Sesiones prácticas durante dos meses.',
      'Duración publicada: 2 meses.',
      'Salida de campo a Lago Calima hacia la mitad del curso.',
      'Certificación en San Andrés, con fecha definida al iniciar el curso.',
    ],
    includes: [],
    excludes: [
      'Costos de la salida a Lago Calima y de la certificación en San Andrés.',
      'Licencia NAUI: USD $60.',
    ],
    investment: ['$900.000, según el folleto.'],
    requirements: [
      'Ser capaz de flotar 10 minutos sin ayuda.',
      'Saber nadar en estilo libre.',
      'Ser mayor de 15 años.',
      'Haber realizado el curso de apnea básico o Skin Diver.',
      'Contar con careta, snorkel, aletas y cinturón de lastre.',
    ],
    notes: [
      'Para la certificación en aguas abiertas, el folleto lista 2 minutos de apnea estática, 50 metros de apnea dinámica con aletas, 20 metros en peso constante con aletas (CWT), 15 metros en modalidad libre (FIM), 10 metros en peso constante sin aletas (CNF) y el rescate de un apneísta a 10 metros.',
      'La fotografía de apoyo no documenta una sesión de este curso.',
    ],
    gaps: ['Fechas de las salidas a Lago Calima y San Andrés'],
    image: cameraImage,
    brochureUrl: 'https://arrecifesdelpacifico.com/wp-content/uploads/2026/03/FREEDIVING-NAUI.pdf',
  },
];

/**
 * @function findCourse
 * @description Busca un curso por el identificador de su ruta.
 * @param slug Identificador del curso. Puede no existir.
 * @returns Curso encontrado o indefinido.
 */
export function findCourse(slug: string | null | undefined): Course | undefined {
  if (!slug) {
    return undefined;
  }

  return courses.find((course) => course.slug === slug);
}

/**
 * @function coursesByGroup
 * @description Filtra los cursos de un grupo de formación.
 * @param group Grupo de inicio o de continuación.
 * @returns Cursos de ese grupo, en el orden publicado.
 */
export function coursesByGroup(group: Course['group']): readonly Course[] {
  return courses.filter((course) => course.group === group);
}

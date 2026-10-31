const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

/**
 * @function formatDateRange
 * @description Escribe un rango de fechas ISO en español de Colombia.
 * @param start Fecha inicial en formato AAAA-MM-DD.
 * @param end Fecha final en formato AAAA-MM-DD.
 * @returns Rango legible, por ejemplo "30 de octubre al 3 de noviembre de 2026".
 */
export function formatDateRange(start: string, end: string): string {
  const [startYear, startMonth, startDay] = start.split('-').map(Number);
  const [endYear, endMonth, endDay] = end.split('-').map(Number);
  const startMonthName = MONTHS[startMonth - 1];
  const endMonthName = MONTHS[endMonth - 1];

  if (startYear === endYear && startMonth === endMonth) {
    return `${startDay} al ${endDay} de ${startMonthName} de ${endYear}`;
  }

  if (startYear === endYear) {
    return `${startDay} de ${startMonthName} al ${endDay} de ${endMonthName} de ${endYear}`;
  }

  return `${startDay} de ${startMonthName} de ${startYear} al ${endDay} de ${endMonthName} de ${endYear}`;
}

/**
 * @function todayInBogota
 * @description Obtiene la fecha civil actual en América/Bogotá.
 * @param now Instante de referencia. Opcional.
 * @returns Fecha en formato AAAA-MM-DD.
 */
export function todayInBogota(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

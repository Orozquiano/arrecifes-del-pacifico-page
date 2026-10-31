import { siteConfig } from '../config/site.config';

/**
 * @function buildWhatsAppUrl
 * @description Construye un enlace wa.me con el número verificado y el mensaje codificado.
 * @param message Texto que verá la persona en WhatsApp.
 * @returns URL lista para abrir el chat.
 */
export function buildWhatsAppUrl(message: string = siteConfig.whatsapp.defaultMessage): string {
  return `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(message)}`;
}

/**
 * @function courseInquiryMessage
 * @description Arma el mensaje de consulta incluyendo el nombre del curso.
 * @param courseName Nombre público del curso.
 * @returns Mensaje para WhatsApp.
 */
export function courseInquiryMessage(courseName: string): string {
  return `¡Hola! Quiero información sobre el curso ${courseName}.`;
}

/**
 * @function tripInquiryMessage
 * @description Arma el mensaje de consulta de una salida con destino y fechas.
 * @param destination Destino de la salida.
 * @param dates Rango de fechas ya formateado.
 * @returns Mensaje para WhatsApp.
 */
export function tripInquiryMessage(destination: string, dates: string): string {
  return `¡Hola! Quiero información sobre la salida a ${destination} del ${dates}.`;
}

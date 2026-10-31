import { buildWhatsAppUrl, courseInquiryMessage, tripInquiryMessage } from './contact-links';

describe('enlaces de contacto', () => {
  it('codifica el mensaje y usa el WhatsApp verificado', () => {
    const url = buildWhatsAppUrl(courseInquiryMessage('Open Water Diver'));

    expect(url.startsWith('https://wa.me/573216426015?text=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Open Water Diver'));
    expect(url).not.toContain(' ');
  });

  it('incluye el destino y las fechas de una salida', () => {
    const message = tripInquiryMessage('Gorgona', '30 de octubre al 3 de noviembre de 2026');

    expect(message).toContain('Gorgona');
    expect(message).toContain('30 de octubre al 3 de noviembre de 2026');
    expect(buildWhatsAppUrl(message)).toContain(encodeURIComponent('Gorgona'));
  });
});

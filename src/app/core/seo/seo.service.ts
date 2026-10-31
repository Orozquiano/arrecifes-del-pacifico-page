import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { siteConfig } from '../config/site.config';

/**
 * @interface PageSeo
 * @description Metadatos de una ruta pública.
 */
export interface PageSeo {
  /**
   * @description Título de la pestaña. Si no incluye el nombre de la empresa, se agrega.
   */
  title: string;

  /**
   * @description Descripción específica de la ruta.
   */
  description: string;

  /**
   * @description Ruta interna, comenzando por /.
   */
  path: string;

  /**
   * @description Imagen para Open Graph. Opcional.
   */
  image?: string;

  /**
   * @description Indicación para robots. Opcional.
   */
  robots?: string;
}

/**
 * @class SeoService
 * @description Actualiza título, descripción, URL canónica, Open Graph y el marcado del negocio.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /**
   * @function setPage
   * @description Publica los metadatos de la ruta actual.
   * @param page Título, descripción y ruta.
   */
  setPage(page: PageSeo): void {
    const fullTitle = page.title.includes(siteConfig.name)
      ? page.title
      : `${page.title} | ${siteConfig.name}`;
    const url = new URL(page.path, siteConfig.origin).toString();
    const image = new URL(page.image ?? '/images/hero-arrecife.webp', siteConfig.origin).toString();

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: page.robots ?? 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: siteConfig.locale });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.setCanonical(url);
  }

  /**
   * @function installBusinessGraph
   * @description Inserta una sola vez los datos estructurados del negocio local.
   */
  installBusinessGraph(): void {
    const id = 'datos-negocio-local';
    if (this.document.getElementById(id)) {
      return;
    }

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.origin,
      image: new URL('/images/logo-color.png', siteConfig.origin).toString(),
      telephone: siteConfig.phone.tel,
      email: siteConfig.email,
      foundingDate: String(siteConfig.founded),
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.locality,
        addressCountry: siteConfig.address.countryCode,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone.tel,
          contactType: 'customer service',
          areaServed: 'CO',
          availableLanguage: 'Spanish',
        },
        {
          '@type': 'ContactPoint',
          telephone: `+${siteConfig.whatsapp.phone}`,
          contactType: 'customer service',
          url: `https://wa.me/${siteConfig.whatsapp.phone}`,
        },
      ],
      sameAs: [
        siteConfig.instagramUrl,
        siteConfig.youtubeChannelUrl,
        siteConfig.tripadvisorUrl,
        siteConfig.storeUrl,
      ],
    });
    this.document.head.appendChild(script);
  }

  /**
   * @function setCanonical
   * @description Crea o actualiza el enlace canónico de la ruta.
   * @param url URL absoluta de la página.
   */
  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}

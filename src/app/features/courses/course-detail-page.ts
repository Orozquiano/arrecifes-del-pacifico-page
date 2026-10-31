import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { courseInquiryMessage } from '../../core/contact/contact-links';
import { SeoService } from '../../core/seo/seo.service';
import { findCourse } from '../../content/courses';
import { InquiryLink } from '../../shared/inquiry-link';
import { NotFoundPage } from '../not-found/not-found-page';

/**
 * @class CourseDetailPage
 * @description Muestra un curso con la información comprobada y la consulta por WhatsApp.
 */
@Component({
  selector: 'app-course-detail-page',
  imports: [RouterLink, InquiryLink, NotFoundPage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-detail-page.html',
  host: { class: 'page' },
})
export class CourseDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  /**
   * @description Curso de la ruta, si el identificador existe.
   */
  readonly course = findCourse(this.route.snapshot.paramMap.get('slug'));

  /**
   * @description Mensaje de WhatsApp con el nombre del curso.
   */
  readonly inquiry = this.course ? courseInquiryMessage(this.course.name) : '';

  constructor() {
    if (!this.course) {
      return;
    }

    this.seo.setPage({
      title: this.course.name,
      description: this.course.summary,
      path: `/cursos/${this.course.slug}`,
      image: this.course.image.src,
    });
  }
}

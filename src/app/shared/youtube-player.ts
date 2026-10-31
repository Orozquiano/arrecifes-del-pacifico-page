import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterRenderEffect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MediaImage } from '../content/models';
import { Icon } from './icon';

const NOCOOKIE_HOST = 'https://www.youtube-nocookie.com';
const PUBLIC_HOST = 'https://www.youtube.com';
const API_SCRIPT_ID = 'youtube-iframe-api';
const PLAYER_WAIT_MS = 12000;

/**
 * @interface YoutubeFailure
 * @description Resultado visible cuando YouTube no puede reproducir el video en la página.
 */
export interface YoutubeFailure {
  /**
   * @description Código devuelto por el reproductor. Cero cuando ni siquiera cargó la API.
   */
  code: number;

  /**
   * @description Explicación breve para quien visita la página.
   */
  message: string;

  /**
   * @description Detalle técnico para documentación interna. No se muestra en la interfaz.
   */
  diagnostic: string | null;

  /**
   * @description Indica si tiene sentido volver a intentar el reproductor.
   */
  retry: boolean;
}

/**
 * @interface YoutubePlayerInstance
 * @description Superficie mínima del reproductor creado por la IFrame API.
 */
interface YoutubePlayerInstance {
  /**
   * @description Destruye el iframe y los listeners del reproductor.
   */
  destroy: () => void;

  /**
   * @description Obtiene el iframe generado por la API.
   * @returns Iframe del reproductor, si ya existe.
   */
  getIframe?: () => HTMLIFrameElement;

  /**
   * @description Solicita la reproducción tras la interacción de la persona.
   */
  playVideo?: () => void;
}

/**
 * @interface YoutubePlayerOptions
 * @description Opciones usadas al crear un reproductor.
 */
interface YoutubePlayerOptions {
  /**
   * @description Identificador del video.
   */
  videoId: string;

  /**
   * @description Dominio del reproductor.
   */
  host: string;

  /**
   * @description Ancho del iframe.
   */
  width: string;

  /**
   * @description Alto del iframe.
   */
  height: string;

  /**
   * @description Parámetros oficiales del reproductor.
   */
  playerVars: Record<string, string | number>;

  /**
   * @description Eventos que se escuchan una sola vez por instancia.
   */
  events: {
    /**
     * @description Avisa que la API está lista. No demuestra que el video esté en reproducción.
     * @param event Evento con el reproductor.
     */
    onReady?: (event: { target: YoutubePlayerInstance }) => void;

    /**
     * @description Informa un fallo de reproducción.
     * @param event Evento con el código numérico.
     */
    onError?: (event: { data: number }) => void;

    /**
     * @description Informa el estado del reproductor. 1 significa que está en reproducción.
     * @param event Evento con el estado numérico.
     */
    onStateChange?: (event: { data: number }) => void;
  };
}

/**
 * @interface YoutubeNamespace
 * @description API global que inyecta el script de YouTube.
 */
interface YoutubeNamespace {
  /**
   * @description Constructor del reproductor.
   */
  Player: new (element: HTMLElement, options: YoutubePlayerOptions) => YoutubePlayerInstance;
}

declare global {
  interface Window {
    /**
     * @description API de YouTube, presente después de cargar el script oficial.
     */
    YT?: YoutubeNamespace;

    /**
     * @description Callback que YouTube ejecuta cuando la API está disponible.
     */
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

/**
 * @function loadYoutubeIframeApi
 * @description Carga una sola vez el script oficial de la IFrame API.
 * @returns Promesa resuelta cuando `YT.Player` existe.
 */
function loadYoutubeIframeApi(): Promise<void> {
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };

      const fail = () => {
        apiPromise = null;
        reject(new Error('youtube-api'));
      };

      const existing = document.getElementById(API_SCRIPT_ID);
      if (existing) {
        existing.addEventListener('error', fail, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = API_SCRIPT_ID;
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => {
        script.remove();
        fail();
      };
      document.head.appendChild(script);
    });
  }

  return apiPromise;
}

/**
 * @function describeYoutubeFailure
 * @description Traduce un código del reproductor a un mensaje y a la acción posible.
 * @param code Código de `onError`, o cero si la API no llegó a crearse.
 * @returns Mensaje, orientación y si corresponde reintentar.
 */
export function describeYoutubeFailure(code: number): YoutubeFailure {
  if (code === 101 || code === 150) {
    return {
      code,
      message: 'Este video no está disponible aquí. Puedes verlo en YouTube.',
      diagnostic:
        'Código 101/150: el propietario no permite la reproducción insertada. En YouTube Studio hay que habilitar la inserción; la página no puede omitir esa restricción.',
      retry: false,
    };
  }

  if (code === 100) {
    return {
      code,
      message: 'Este video no está disponible. Puedes abrirlo en YouTube.',
      diagnostic: 'Código 100: video privado, eliminado o inexistente.',
      retry: false,
    };
  }

  if (code === 153) {
    return {
      code,
      message: 'No se pudo cargar el video aquí. Puedes verlo en YouTube.',
      diagnostic:
        'Código 153: YouTube rechazó el reproductor por Referer. No depende de autoplay ni allow.',
      retry: true,
    };
  }

  if (code === 0) {
    return {
      code,
      message: 'No se pudo cargar el video. Puedes verlo en YouTube.',
      diagnostic: 'La API o el iframe no llegaron a crearse a tiempo.',
      retry: true,
    };
  }

  if (code === 2 || code === 5) {
    return {
      code,
      message: 'El video no pudo iniciar aquí. Puedes verlo en YouTube.',
      diagnostic: `Código ${code}: fallo al iniciar el reproductor.`,
      retry: true,
    };
  }

  return {
    code,
    message: 'No se pudo reproducir el video aquí. Puedes verlo en YouTube.',
    diagnostic: `Código ${code} del reproductor.`,
    retry: true,
  };
}

/**
 * @class YoutubePlayer
 * @description Muestra una vista previa y crea un reproductor solo después de un clic.
 * Mantiene el enlace externo, informa el fallo real y destruye el reproductor al salir.
 */
@Component({
  selector: 'app-youtube-player',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './youtube-player.html',
})
export class YoutubePlayer implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly frame = viewChild<ElementRef<HTMLElement>>('frame');
  private player?: YoutubePlayerInstance;
  private readonly startedAttempts = new Set<number>();
  private destroyed = false;
  private waitId = 0;

  /**
   * @description Identificador del video en YouTube.
   */
  readonly videoId = input.required<string>();

  /**
   * @description Título visible y nombre accesible del reproductor.
   */
  readonly title = input.required<string>();

  /**
   * @description Página del video en YouTube.
   */
  readonly watchUrl = input.required<string>();

  /**
   * @description Imagen previa. Opcional.
   */
  readonly poster = input<MediaImage | null>(null);

  /**
   * @description Fase visible: vista previa, carga, listo o fallo.
   */
  readonly phase = signal<'preview' | 'loading' | 'ready' | 'error'>('preview');

  /**
   * @description Dominio del iframe. Empieza en el modo sin cookies.
   */
  readonly host = signal(NOCOOKIE_HOST);

  /**
   * @description Generación del montaje, para ignorar respuestas de un intento anterior.
   */
  readonly attempt = signal(0);

  /**
   * @description Fallo actual. Nulo mientras no haya un error que mostrar.
   */
  readonly failure = signal<YoutubeFailure | null>(null);

  constructor() {
    afterRenderEffect({
      mixedReadWrite: () => {
        if (!isPlatformBrowser(this.platformId)) {
          return;
        }

        const phase = this.phase();
        const attempt = this.attempt();
        const node = this.frame()?.nativeElement;
        const videoId = this.videoId();
        const host = this.host();
        const title = this.title();
        if (phase !== 'loading' || !node || this.startedAttempts.has(attempt)) {
          return;
        }

        this.startedAttempts.add(attempt);
        void this.createPlayer(node, attempt, videoId, host, title);
      },
    });
  }

  /**
   * @function ngOnDestroy
   * @description Destruye el reproductor y cancela la espera de carga.
   */
  ngOnDestroy(): void {
    this.destroyed = true;
    window.clearTimeout(this.waitId);
    this.destroyPlayer();
  }

  /**
   * @function activate
   * @description Pide el reproductor a partir del clic de la persona.
   */
  activate(): void {
    if (this.phase() !== 'preview') {
      return;
    }
    this.failure.set(null);
    this.phase.set('loading');
  }

  /**
   * @function retry
   * @description Vuelve a crear el reproductor cuando el fallo puede ser transitorio.
   */
  retry(): void {
    const failure = this.failure();
    if (!failure?.retry || this.destroyed) {
      return;
    }
    this.destroyPlayer();
    this.failure.set(null);
    this.host.set(NOCOOKIE_HOST);
    this.phase.set('loading');
    this.attempt.update((value) => value + 1);
  }

  /**
   * @function createPlayer
   * @description Crea una instancia de la API para el intento indicado.
   * @param node Contenedor que YouTube reemplaza por el iframe.
   * @param attempt Generación que debe seguir vigente al responder la API.
   * @param videoId Identificador del video.
   * @param host Dominio del reproductor.
   * @param title Título accesible del iframe.
   */
  private async createPlayer(
    node: HTMLElement,
    attempt: number,
    videoId: string,
    host: string,
    title: string,
  ): Promise<void> {
    window.clearTimeout(this.waitId);
    this.waitId = window.setTimeout(() => {
      if (!this.destroyed && this.attempt() === attempt && this.phase() === 'loading') {
        this.fail(0, attempt);
      }
    }, PLAYER_WAIT_MS);

    try {
      await loadYoutubeIframeApi();
    } catch {
      this.fail(0, attempt);
      return;
    }

    if (this.destroyed || this.attempt() !== attempt || this.phase() !== 'loading' || !node.isConnected) {
      return;
    }

    const Player = window.YT?.Player;
    if (!Player) {
      this.fail(0, attempt);
      return;
    }

    this.destroyPlayer();
    this.player = new Player(node, {
      videoId,
      host,
      width: '100%',
      height: '100%',
      playerVars: {
        rel: 0,
        playsinline: 1,
        origin: window.location.origin,
        autoplay: 1,
      },
      events: {
        onReady: (event) => {
          if (this.attempt() !== attempt || this.phase() !== 'loading') {
            return;
          }
          const iframe = event.target.getIframe?.();
          iframe?.setAttribute('title', title);
          iframe?.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
          // onReady no prueba reproducción real; se confirma con estado PLAYING.
          try {
            event.target.playVideo?.();
          } catch {
            // El clic previo debería permitir autoplay; si falla, espera onError o timeout.
          }
        },
        onError: (event) => this.handleError(event.data, attempt),
        onStateChange: (event) => {
          if (this.attempt() !== attempt) {
            return;
          }
          if (event.data === 1) {
            window.clearTimeout(this.waitId);
            this.hostElement.nativeElement.dataset['playback'] = 'playing';
            if (this.phase() === 'loading') {
              this.phase.set('ready');
            }
          }
        },
      },
    });
  }

  /**
   * @function handleError
   * @description Atiende el código del reproductor sin tratar la carga del iframe como éxito.
   * @param code Código recibido en `onError`.
   * @param attempt Intento que produjo el código.
   */
  private handleError(code: number, attempt: number): void {
    if (this.destroyed || this.attempt() !== attempt) {
      return;
    }

    if (code === 153 && this.host() === NOCOOKIE_HOST) {
      this.destroyPlayer();
      this.host.set(PUBLIC_HOST);
      this.attempt.update((value) => value + 1);
      return;
    }

    this.fail(code, attempt);
  }

  /**
   * @function fail
   * @description Muestra el fallo y retira el reproductor de ese intento.
   * @param code Código de error.
   * @param attempt Intento que falló.
   */
  private fail(code: number, attempt: number): void {
    if (this.destroyed || this.attempt() !== attempt) {
      return;
    }
    window.clearTimeout(this.waitId);
    this.destroyPlayer();
    this.failure.set(describeYoutubeFailure(code));
    this.phase.set('error');
  }

  /**
   * @function destroyPlayer
   * @description Elimina la instancia actual si YouTube todavía la reconoce.
   */
  private destroyPlayer(): void {
    const player = this.player;
    this.player = undefined;
    try {
      player?.destroy();
    } catch {
      // La API ya retiró el nodo.
    }
  }
}

import { describeYoutubeFailure } from './youtube-player';

describe('describeYoutubeFailure', () => {
  it('explica la restricción de inserción sin ofrecer un reintento inútil', () => {
    for (const code of [101, 150]) {
      const failure = describeYoutubeFailure(code);
      expect(failure.retry).toBe(false);
      expect(failure.message).toContain('YouTube');
      expect(failure.diagnostic).toContain('101/150');
      expect(failure.message).not.toContain('Studio');
    }
  });

  it('distingue un video inexistente de un referer rechazado', () => {
    expect(describeYoutubeFailure(100).retry).toBe(false);
    expect(describeYoutubeFailure(153).retry).toBe(true);
    expect(describeYoutubeFailure(153).diagnostic).toContain('Referer');
  });

  it('permite reintentar cuando el reproductor no llega a crearse', () => {
    expect(describeYoutubeFailure(0).retry).toBe(true);
    expect(describeYoutubeFailure(5).retry).toBe(true);
  });

  it('mantiene el mensaje público breve y sin detalle administrativo', () => {
    const failure = describeYoutubeFailure(150);
    expect(failure.message.length).toBeLessThan(90);
    expect(failure.message).not.toContain('Referer');
    expect(failure.message).not.toContain('inserción');
  });
});

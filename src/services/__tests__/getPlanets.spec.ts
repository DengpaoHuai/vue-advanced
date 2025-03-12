import { describe, it, expect, vi, type Mock } from 'vitest';
import httpClient from '@/lib/http-client';
import { getPlanets } from '@/services/planet.service';

vi.mock('@/lib/http-client', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('getPlanets', () => {
  it('appelle la bonne URL avec un paramètre de page spécifique', async () => {
    (httpClient.get as Mock).mockResolvedValueOnce({
      data: { results: [{ name: 'Mars' }] },
    });

    const result = await getPlanets(3);

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('planets/?page=3');

    expect(result).toEqual({ results: [{ name: 'Mars' }] });
  });

  it('appelle par défaut la page 1', async () => {
    (httpClient.get as Mock).mockResolvedValueOnce({
      data: { results: [{ name: 'Earth' }] },
    });

    const result = await getPlanets();

    expect(httpClient.get).toHaveBeenCalledWith('planets/?page=1');
    expect(result).toEqual({ results: [{ name: 'Earth' }] });
  });
});

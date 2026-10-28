import { describe, it, expect, vi } from 'vitest';
import { getRandomDogImage} from '../services/dogService';

describe('dogService', () => {
  it('returns dog image', async () => {
    const mock = { message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg', status: 'success' };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => mock });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mock.message);
    expect(result.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('throws an error when the API returns status 500', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
  vi.stubGlobal('fetch', fetchMock);

  await expect(getRandomDogImage()).rejects.toThrow(
    'Failed to fetch dog image: Dog API returned status 500'
  );
});

});
import { describe, it, expect, vi } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import { getRandomDogImage } from '../services/dogService';

vi.mock('../services/dogService');


describe('dogController', () => {
  it('returns success true and the mocked image', async () => {
    const mockImage = { imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg', status: 'success' };
    vi.mocked(getRandomDogImage).mockResolvedValue(mockImage);
    const req = {} as any;
    const res = { json: vi.fn() } as any;
    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockImage });
  });
});

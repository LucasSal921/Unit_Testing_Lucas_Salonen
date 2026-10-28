// Käytin tässä AI apua
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';

const mockResponse = vi.hoisted(() => ({
  success: true,
  data: { imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg', status: 'success' }
}));

vi.mock('../controllers/dogController', () => ({
  getDogImage: (_req: any, res: any) => res.json(mockResponse)
}));

const app = express();
app.use('/api/dogs', dogRoutes);

let server: any;
let port: number;

beforeAll(async () => {
  await new Promise<void>((resolve) => { server = app.listen(0, resolve); });
  port = server.address().port;
});

afterAll(() => {
  server.close();
});

describe('dogRoutes', () => {
  it('GET /api/dogs/random returns 200, success true and the mocked image url', async () => {
    const response = await fetch(`http://localhost:${port}/api/dogs/random`);
    const body = (await response.json()) as any;

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.imageUrl).toContain(mockResponse.data.imageUrl);
  });
});
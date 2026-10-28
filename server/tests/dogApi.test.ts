import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';

const mockResponse = vi.hoisted(() => ({
  success: false,
  error: 'Failed to fetch dog image: Network error'
}));

vi.mock('../controllers/dogController', () => ({
  getDogImage: (_req: any, res: any) => res.status(500).json(mockResponse)
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

describe('dogRoutes error', () => {
  it('GET /api/dogs/random returns 500 and the error JSON', async () => {
    const response = await fetch(`http://localhost:${port}/api/dogs/random`);
    const body = (await response.json()) as any;

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.error).toBe(mockResponse.error);
  });
});
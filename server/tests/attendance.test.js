import request from 'supertest';
import app from '../app.js';
import prisma from '../lib/prisma.js';

describe('Attendance API', () => {

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should get all attendance', async () => {
    const res = await request(app)
      .get('/api/attendance/getAll')
      .expect(200);

    // check that the data property is an array
    expect(Array.isArray(res.body.data)).toBe(true);
    // optional: check success flag
    expect(res.body.success).toBe(true);
  });
});

import request from 'supertest';
import app from '../app.js';
import prisma from '../lib/prisma.js';

// Mock JWT token (replace with real generator if available)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MTQxNmU2LTU2NTMtNGZkNC04YmEzLTM1NDYzNGFkMzc4OSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1Njg4NjEzNSwiZXhwIjoxNzU2OTcyNTM1fQ.0tw_2ANF30loR6ij7twLFyFylP9aOdh5IxeAb1FbMRE";
const personId="699f9d86-99b2-4e64-8c78-96b7cae61176"
const personList = ["699f9d86-99b2-4e64-8c78-96b7cae61176","7802111f-be36-4153-930c-fe3ab00285c2","474bfa4d-14bd-4902-9eff-b1362d5247e1"]
describe('Tea Plucking API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

//    describe('POST /api/teaPlucking/addSingle', () => {
//     it('should create a tea plucking record with valid data', async () => {
//       const res = await request(app)
//         .post('/api/teaPlucking/addSingle')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           personId: personId,
//           weightKg: 10,
//           ratePerKg: 50,
//           totalPayment: 500,
//           date: new Date().toISOString()
//         })
//         .expect(201);

//       expect(res.body.success).toBe(true);
//       expect(res.body.data).toHaveProperty('tpId');
//     });

//     it('should fail if required fields are missing', async () => {
//       const res = await request(app)
//         .post('/api/teaPlucking/addSingle')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           personId: personId
//           // missing fields
//         })
//         .expect(400);

//       expect(res.body.success).toBe(false);
//     });

//     it('should fail if duplicate record is added for same date', async () => {
//       const date = new Date().toISOString();

//       // Insert first
//       await request(app)
//         .post('/api/teaPlucking/addSingle')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           personId: personId,
//           weightKg: 12,
//           ratePerKg: 40,
//           totalPayment: 480,
//           date
//         })
//         .expect(201);

//       // Insert duplicate
//       const res = await request(app)
//         .post('/api/teaPlucking/addSingle')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           personId: personId,
//           weightKg: 15,
//           ratePerKg: 40,
//           totalPayment: 600,
//           date
//         })
//         .expect(409);

//       expect(res.body.success).toBe(false);
//     });
// });

//   describe('POST /api/teaPlucking/addBulk', () => {
//     it('should insert multiple tea plucking records', async () => {
//       const res = await request(app)
//         .post('/api/teaPlucking/addBulk')
//         .set('Authorization', `Bearer ${token}`)
//         .send([
//           {
//             personId: personList[0],
//             weightKg: 8,
//             ratePerKg: 50,
//             totalPayment: 400,
//             date: new Date().toISOString()
//           },
//           {
//             personId: personList[1],
//             weightKg: 7,
//             ratePerKg: 60,
//             totalPayment: 420,
//             date: new Date().toISOString()
//           }
//         ])
//         .expect(201);

//       expect(res.body.success).toBe(true);
//       expect(Array.isArray(res.body.results)).toBe(true);
//     });

//     it('should fail when empty array is provided', async () => {
//       const res = await request(app)
//         .post('/api/teaPlucking/addBulk')
//         .set('Authorization', `Bearer ${token}`)
//         .send([])
//         .expect(400);

//       expect(res.body.success).toBe(false);
//     });
//   });

  describe('GET /api/teaPlucking/getAll', () => {
    it('should fetch all tea plucking records with token', async () => {
      const res = await request(app)
        .get('/api/teaPlucking/getAll')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should fail without token', async () => {
      const res = await request(app)
        .get('/api/teaPlucking/getAll')
        .expect(401);

      expect(res.body).toHaveProperty('message');
    });
  });
});

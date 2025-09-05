import request from 'supertest';
import app from '../app.js';
import prisma from '../lib/prisma.js';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MTQxNmU2LTU2NTMtNGZkNC04YmEzLTM1NDYzNGFkMzc4OSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1Njg4NjEzNSwiZXhwIjoxNzU2OTcyNTM1fQ.0tw_2ANF30loR6ij7twLFyFylP9aOdh5IxeAb1FbMRE";

describe('Person API', () => {
  let createdPersonId;

  afterAll(async () => {
    await prisma.$disconnect();
  });

//   it('should add a new person', async () => {
//     const res = await request(app)
//       .post('/api/person/add')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         firstName: 'John',
//         lastName: 'Doe',
//         nicNumber: '991234567V',
//         email: 'john.doe@example.com',
//         phone: '0712345678',
//         address: 'Colombo, Sri Lanka',
//         gender: 'Male',
//         roleId: "f289ac80-c8b9-4ee8-9a25-a556c2d0448e",
//         dob: '1999-05-20'
//       })
//       .expect(201);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty('personId');
//     createdPersonId = res.body.data.personId;
//   });
  it('should get all roles', async () => {
    const res = await request(app)
      .get('/api/person/getRoles')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.roles)).toBe(true);
  });

//   it('should get all supervisors', async () => {
//     const res = await request(app)
//       .get('/api/person/getAllSupervisors')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.supervisors)).toBe(true);
//   });

//   it('should get person count', async () => {
//     const res = await request(app)
//       .get('/api/person/getPersonCount')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(typeof res.body.personCount).toBe('number');
//   });

//   it('should get all persons', async () => {
//     const res = await request(app)
//       .get('/api/person/getAllPerson')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.allPerson)).toBe(true);
//   });

//   it('should get all tea pluckers', async () => {
//     const res = await request(app)
//       .get('/api/person/getAllTeaPluckers')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.workers)).toBe(true);
//   });

//   it('should get all workers', async () => {
//     const res = await request(app)
//       .get('/api/person/getAllWorkers')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.workers)).toBe(true);
//   });

//   it('should delete a person', async () => {
//     const res = await request(app)
//       .delete(`/api/person/deletePerson/${createdPersonId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toBe("Person Deleted Successfully!");
//   });


//   it('should fail without token', async () => {
//   const res = await request(app)
//     .get('/api/person/getAllPerson')
//     .expect(401);

//   expect(res.body).toHaveProperty('message');
//   expect(res.body.message).toMatch(/token/i);
// });


//   it('should fail to add person with missing fields', async () => {
//     const res = await request(app)
//       .post('/api/person/add')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         firstName: '',
//         lastName: '',
//         nicNumber: '',
//         address: '',
//         gender: '',
//         roleId: ''
//       })
//       .expect(401);

//     expect(res.body.success).toBe(false);
//     expect(res.body.message).toBe("All fields are requried!!");
//   });
});

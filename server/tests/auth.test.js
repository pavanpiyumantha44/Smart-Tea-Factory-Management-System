// tests/auth.test.js
import request from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import { AuthFactory } from "../services/authFactory.js";

const authService = AuthFactory();

describe("Auth API", () => {
  let testPersonId = "699f9d86-99b2-4e64-8c78-96b7cae61176";
  let username = "mang";
  let password = "man@123";
  let hashedPassword;

  beforeAll(async () => {
    hashedPassword = await authService.hashPassword(password);
  });

  afterAll(async () => {
    // Cleanup test account
    // await prisma.account.deleteMany({ where: { username } });
    await prisma.$disconnect();
  });

  // ================= REGISTER =================
  describe("POST /api/auth/register", () => {
    // it("should register a new account", async () => {
    //   const res = await request(app)
    //     .post("/api/auth/register")
    //     .send({ personId: testPersonId, username, password })
    //     .expect(201);

    //   expect(res.body.success).toBe(true);
    //   expect(res.body.account).toHaveProperty("username", username);
    // });

    // it("should fail if required fields are missing", async () => {
    //   const res = await request(app)
    //     .post("/api/auth/register")
    //     .send({ username })
    //     .expect(400);

    //   expect(res.body.success).toBe(false);
    //   expect(res.body.message).toMatch(/All fields/i);
    // });

    // it("should fail if person already has an account", async () => {
    //   const res = await request(app)
    //     .post("/api/auth/register")
    //     .send({ personId: testPersonId, username, password }) 
    //     .expect(401);

    //   expect(res.body.success).toBe(false);
    //   expect(res.body.message).toMatch(/already has an account/i);
    // });  
//   it("should fail if person already has an account", async () => {
//     const res = await request(app)
//       .post("/api/auth/register")
//       .send({ personId: testPersonId, username: "newUser", password }) // username can be anything
//       .expect(401);

//     expect(res.body.success).toBe(false);
//     expect(res.body.message).toMatch(/already has an account/i);
//   });
});

  // ================= LOGIN =================
  describe("POST /api/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username, password })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty("token");
      expect(res.body.person).toHaveProperty("username", username);
    });

    it("should fail if username/password missing", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/All fields/i);
    });

    it("should fail with invalid username", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "wronguser", password })
        .expect(401);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Invalid account/i);
    });

    it("should fail with invalid password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username, password: "wrongpass" })
        .expect(401);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Invalid password/i);
    });
  });
});

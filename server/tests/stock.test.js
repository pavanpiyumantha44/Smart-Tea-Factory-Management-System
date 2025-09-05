import request from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

let token;
let testStockId;
const payload={
    id: "d1daf799-7d5c-416e-95ea-7c2c4f467059",
    role: "MANAGER",
  }

beforeAll(async () => {
  token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {expiresIn: "1h",});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Stock API", () => {

  it("should fail without token", async () => {
    const res = await request(app).get("/api/stock/getAll").expect(401);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/unauthorized/i);
  });

//   it("should create a new stock item", async () => {
//     const res = await request(app)
//       .post("/api/stock/add")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Test Item",
//         category: "Tea",
//         quantity: 100,
//         unit: "kg",
//         unitPrice: 50,
//       })
//       .expect(201);

//     expect(res.body.success).toBe(true);
//     testStockId = res.body.data?.itemId;
//   });

//   it("should fail to create stock with missing fields", async () => {
//     const res = await request(app)
//       .post("/api/stock/add")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name: "Test Item" })
//       .expect(400);

//     expect(res.body.success).toBe(false);
//   });

  it("should fetch all stock items", async () => {
    const res = await request(app)
      .get("/api/stock/getAll")
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

//   it("should fetch single stock item", async () => {
//     const res = await request(app)
//       .get(`/api/stock/getItem/${testStockId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("name", "Test Item");
//   });
//   it("should update stock item", async () => {
//     const res = await request(app)
//       .put(`/api/stock/edit/${testStockId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Test Item",
//         category: "Tea Leaves",
//         quantity: 120,
//         unit: "kg",
//         unitPrice: 55,
//       })
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("quantity", 120);
//   });

//   it("should fail to update with missing fields", async () => {
//     const res = await request(app)
//       .put(`/api/stock/edit/${testStockId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name: "Incomplete" })
//       .expect(400);

//     expect(res.body.success).toBe(false);
//   });

});

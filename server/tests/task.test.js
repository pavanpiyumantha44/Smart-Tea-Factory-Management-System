import request from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

let testTaskId;
let token;
let supervisorId="a71b34b2-7123-4829-a8e3-1b8809fd3fde"
let createdBy="d1daf799-7d5c-416e-95ea-7c2c4f467059"
let teamId="ad271222-1127-4e8b-9638-a31cd55b2a72"
let stockItems = ["f969d4ff-2716-4535-8edd-09f77bf4a490","d715851c-c47a-4eea-a786-777493601eba"]
let placeId="aff3e962-ee64-4f52-984d-042774fca182"
const payload={
    id: "d1daf799-7d5c-416e-95ea-7c2c4f467059",
    role: "MANAGER",
  }

beforeAll(() => {
    token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {expiresIn: "1h",});
});

afterAll(async () => {
  await prisma.$disconnect();
});

const testTaskData = {
  taskName: "Test Task",
  description: "This is a test task",
  taskType: "DAILY",
  taskStatus: "PENDING",
  createdBy: createdBy,
  assignedSupervisor: supervisorId,
  placeId: placeId,
  startDateTime: new Date().toISOString(),
  teamId: teamId,
  workerId: supervisorId,
  items: [
    { itemId: stockItems[0], quantity: 5 },
    { itemId: stockItems[1], quantity: 3 },
  ],
};

describe("Task API with Auth", () => {

//   it("should fail without token", async () => {
//     const res = await request(app)
//       .get("/api/tasks/getAllTasks")
//       .expect(401);

//     expect(res.body).toHaveProperty("message");
//     expect(res.body.message).toMatch(/Unauthorized/i);
//   });

//   it("should create a new task", async () => {
//     const res = await request(app)
//       .post("/api/tasks/newTask")
//       .set("Authorization", `Bearer ${token}`)
//       .send(testTaskData)
//       .expect(201);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("taskId");
//     testTaskId = res.body.data.taskId;
//   });

//   it("should fetch all tasks", async () => {
//     const res = await request(app)
//       .get("/api/tasks/getAllTasks")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.data)).toBe(true);
//   });

//   it("should fetch single task by id", async () => {
//     const res = await request(app)
//       .get(`/api/tasks/getTask/${testTaskId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("taskId", testTaskId);
//   });

//   it("should update task status", async () => {
//     const newStatus = "COMPLETED";
//     const res = await request(app)
//       .put(`/api/tasks/updateStatus/${testTaskId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ data: newStatus })
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("taskStatus", newStatus);
//   });

//   it("should update task info", async () => {
//     const updatedTaskData = {
//       ...testTaskData,
//       description: "Updated description",
//       taskStatus: "IN_PROGRESS",
//     };

//     const res = await request(app)
//       .put(`/api/tasks/edit/${testTaskId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(updatedTaskData)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("description", "Updated description");
//     expect(res.body.data).toHaveProperty("taskStatus", "IN_PROGRESS");
//   });

  it("should return 404 for invalid task id", async () => {
    const res = await request(app)
      .get("/api/tasks/getTask/invalid-id")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Failed to fetch task/i);
  });
});

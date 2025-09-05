import request from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

describe("Teams API", () => {
  let token;
  let teamId;
  let personId = "699f9d86-99b2-4e64-8c78-96b7cae61176";
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

//   it("should fail without token", async () => {
//   const res = await request(app)
//     .get("/api/teams/getAllTeams")
//     .expect(401);

//   expect(res.body).toHaveProperty("message");
//   expect(res.body.message).toMatch(/Unauthorized/i);
// });


//   it("should create a new team", async () => {
//     const res = await request(app)
//       .post("/api/teams/add")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Harvest Team A",
//         description: "Handles morning tea plucking",
//       })
//       .expect(201);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("teamId");
//     teamId = res.body.data.teamId;
//   });

  it("should fetch all teams", async () => {
    const res = await request(app)
      .get("/api/teams/getAllTeams")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

//   it("should get team info by ID", async () => {
//     const res = await request(app)
//       .get(`/api/teams/getTeam/${teamId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("teamId", teamId);
//   });

//   it("should update team description", async () => {
//     const res = await request(app)
//       .put(`/api/teams/edit/${teamId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ description: "Updated description" })
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toBe("Team Updated Successfully!");
//   });

//   it("should add a new team member", async () => {
//     const res = await request(app)
//       .post("/api/teams/newTeamMember")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         teamId,
//         personId,
//         joinedDate: new Date().toISOString(),
//       })
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data).toHaveProperty("teamId", teamId);
//     expect(res.body.data).toHaveProperty("personId", personId);
//   });

//   it("should fetch team members", async () => {
//     const res = await request(app)
//       .get(`/api/teams/getTeamMembers/${teamId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.data)).toBe(true);
//   });

//   it("should remove a team member", async () => {
//     const res = await request(app)
//       .delete("/api/teams/deleteTeamMember")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ teamId, personId })
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toBe("Team member deleted successfully");
//   });

//   it("should soft delete the team", async () => {
//     const res = await request(app)
//       .put(`/api/teams/delete/${teamId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toBe("Team deleted successfully!");
//   });

//   it("should fetch workers without teams", async () => {
//     const res = await request(app)
//       .get("/api/teams/withoutTeams")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.data)).toBe(true);
//   });
});

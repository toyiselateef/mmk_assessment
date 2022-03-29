import request from "supertest";
import db from "../../src/config/db";

var server;

describe("sms routes - ", () => {
  beforeAll(() => {
    server = require("../../src/app");
  });
  afterAll(async () => {
    db.end();
  });

  describe("GET /", () => {
    it("Should return method not allowed :: inbound (405)", async () => {
      const res = await request(server).get("/sms/inbound");
      expect(res.status).toBe(405);
    });
  });

  describe("POST /", () => {
    it("Should return username/password invalid allowed (403)", async () => {
      const res = await request(server).get("/sms/inbound");
      expect(res.status).toBe(403);
    });
  });

  describe("GET /", () => {
    it("Should return method not allowed :: outbound (405) ", async () => {
      const res = await request(server).get("/sms/outbound");
      expect(res.status).toBe(405);
    });
  });

  describe("POST /", () => {
    it("Should return bad request (403)", async () => {
      const res = await request(server).get("/sms/outbound");
      expect(res.status).toBe(403);
    });
  });

  describe("POST /", () => {
    it("Should return no such endpoint(404)", async () => {
      const res = await request(server).get("/sms");
      expect(res.status).toBe(404);
    });
  });

  //   describe("POST /", () => {
  //     it("Should return success (403)", async () => {
  //       const res = await request(server).get("/sms/outbound");
  //       expect(res.status).toBe(403);
  //     });
  //   });
});

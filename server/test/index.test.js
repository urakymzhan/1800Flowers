const { router } = require("../routes");
const request = require("supertest");
const express = require("express");
const mockData = require("./data");

const app = new express();
app.use("/", router);

describe("Good Home Routes", () => {
  test("responds to /posts", async () => {
    const res = await request(app).get("/posts");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.header["x-powered-by"]).toBe("Express");
    expect(res.header["content-length"]).toBe("24519");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual(mockData);
  });
});

import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";

import app from "../../app.js";
import userModel from "../../models/user.js";

const { User } = userModel;

const { PORT, DB_HOST_TEST } = process.env;

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  })

  test("test login with correct data", async () => {
    const registerData = {
      email: "test@gmail.com",
      password: "123456",
    };
    const loginData = {
      email: "test@gmail.com",
      password: "123456",
    };
    const responceRegister = await request(app)
      .post("/users/register")
      .send(registerData);
    // const response = await request(app).post("/users/login").send(loginData);
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body).toHaveProperty(["user", "email"], expect.any(String));
    expect(body).toHaveProperty(["user", "subscription"], expect.any(String));

    const user = await User.findOne({ email: loginData.email });
    expect(user.email).toBe(loginData.email);
  });
});

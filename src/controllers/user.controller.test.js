const request = require("supertest");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const {
  startTestDatabase,
  stopTestDatabase,
} = require("../../config/testDatabase");

const { MessageUtil, ResponseUtil } = require("../utils");
const app = require("../app");
const User = require("../models/User");

describe("User Controller", () => {
  beforeAll(async () => {
    await startTestDatabase();
  });

  afterAll(async () => {
    await stopTestDatabase();
  });

  it("should create a new user", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .send(userData)
      .expect(200);

    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("accessToken");
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(MessageUtil.USER.REGISTER_SUCCESSFUL);
    expect(response.body.data.user.email).toEqual(userData.email);
  });

  it("should return an error if user already exists", async () => {
    const existingUser = new User({
      email: "existing@example.com",
      password: await bcrypt.hash("existingpassword", 10),
    });
    await existingUser.save();

    const userData = {
      email: "existing@example.com",
      password: "newpassword",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .send(userData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.data).toBeNull();
    expect(response.body.error).toBe(MessageUtil.USER.USER_ALREADY_EXISTS);
  });

  it("should return validation error for invalid input", async () => {
    const invalidUserData = {
      email: "invalid-email",
      password: "short",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .send(invalidUserData)
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      data: null,
      error: [
        {
          type: "field",
          value: "invalid-email",
          msg: "Invalid value",
          path: "email",
          location: "body",
        },
        {
          type: "field",
          value: "short",
          msg: "Invalid value",
          path: "password",
          location: "body",
        },
      ],
    });
  });
});

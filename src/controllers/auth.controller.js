const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MessageUtil, ResponseUtil } = require("../utils");
const User = require("../models/User");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(
      { email, isDeleted: false },
      "+password"
    ).populate("role");

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.INVALID_EMAIL
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.INVALID_PASSWORD
      );
    }

    if (user && user.status === "terminated") {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.UNAUTHORIZED_LOGIN
      );
    }

    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    ResponseUtil.sendSuccess(
      res,
      { user, accessToken },
      MessageUtil.USER.LOGIN_SUCCESSFUL
    );
  } catch (error) {
    console.error(error);
    ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

authController.accountSetup = async (req, res, next) => {
  try {
    const currentUserId = req.setupUserId;
    let { userName, email, password } = req.body;

    let user = await User.findById(currentUserId);

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.USER_NOT_FOUND
      );
    }

    if (user.email !== email) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.INVALID_EMAIL
      );
    }

    if (user.status !== "pending") {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.ACCOUNT_ALREADY_SET_UP
      );
    }

    const userSameName = await User.findOne({
      userName,
      _id: { $ne: currentUserId },
    });

    if (userSameName) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.USERNAME_ALREADY_TAKEN
      );
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user.userName = userName;
    user.password = password;
    user.status = "active";
    await user.save();

    ResponseUtil.sendSuccess(
      res,
      user,
      MessageUtil.USER.REGISTER_SUCCESSFUL
    );
  } catch (error) {
    console.error(error);
    ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

authController.logout = async (req, res, next) => {
  try {
    const currentUserId = req.userId;

    const user = await User.findById(currentUserId);

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.USER_NOT_FOUND
      );
    }

    ResponseUtil.sendSuccess(
      res,
      null,
      MessageUtil.USER.LOG
    );
  } catch (error) {
    console.error(error);
    ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

module.exports = authController;

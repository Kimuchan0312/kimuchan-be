const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const { MessageUtil, ResponseUtil } = require("../utils");
const User = require("../models/User");
// const { sendEmail } = require("../services");

const userController = {};


userController.register = async (req, res, next) => {
  await body('email').isEmail().normalizeEmail().run(req);
  await body('password').isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.BAD_REQUEST,
      errors.array()
    );
  }

  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.USER_ALREADY_EXISTS
      );
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.create({ email, password });

    const accessToken = await user.generateToken();

    return ResponseUtil.sendSuccess(
      res,
      { user, accessToken },
      MessageUtil.USER.REGISTER_SUCCESSFUL
    );
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
};

userController.updateCurrentUser = async (req, res) => {
  const userId = req.userId;
  const { username, avatarUrl, role } = req.body;

  try {
    if (role && !["admin", "user"].includes(role)) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.INVALID_ROLE
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.NOT_FOUND,
        MessageUtil.USER.USER_NOT_FOUND
      );
    }

    if (username) user.username = username;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (role) user.role = role;

    await user.save();
    return ResponseUtil.sendSuccess(
      res,
      user,
      MessageUtil.USER.USER_UPDATE_SUCCESSFUL
    );
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      MessageUtil.INTERNAL_SERVER_ERROR
    );
  }
};

userController.getCurrentUser = async (req, res) => {
  const userId = req.userId;

  try {
    if (req.user._id.toString() !== userId) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.FORBIDDEN,
        MessageUtil.USER.PERMISSION_DENIED_NON_SAME_USER
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.NOT_FOUND,
        MessageUtil.USER.USER_NOT_FOUND
      );
    }
    return ResponseUtil.sendSuccess(res, user);
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      MessageUtil.INTERNAL_SERVER_ERROR
    );
  }
};

userController.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter).skip(skip).limit(parseInt(limit));
    const totalUsers = await User.countDocuments(filter);

    return ResponseUtil.sendSuccess(res, { users, totalUsers });
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      MessageUtil.INTERNAL_SERVER_ERROR
    );
  }
};

userController.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return ResponseUtil.sendError(res, ResponseUtil.NOT_FOUND, MessageUtil.USER.USER_NOT_FOUND);
    }

    await user.remove();

    return ResponseUtil.sendSuccess(res, null, MessageUtil.USER.USER_DELETE_SUCCESSFUL);
  } catch (error) {
    return ResponseUtil.sendError(res, ResponseUtil.INTERNAL_SERVER_ERROR, MessageUtil.INTERNAL_SERVER_ERROR);
  }
};

userController.initiatePasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.NOT_FOUND,
        MessageUtil.USER.USER_NOT_FOUND
      );
    }

    // Generate a unique token for password reset
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    // Send an email to the user with the reset link
    const resetLink = `http://your-frontend-app/reset-password?token=${resetToken}`;
    const emailContent = `Click the following link to reset your password: ${resetLink}`;

    // await sendEmail(user.email, 'Password Reset', emailContent);

    return ResponseUtil.sendSuccess(
      res,
      null,
      MessageUtil.USER.RESET_PASSWORD_EMAIL_SENT
    );
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      MessageUtil.INTERNAL_SERVER_ERROR
    );
  }
};

userController.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.BAD_REQUEST,
        MessageUtil.USER.INVALID_RESET_TOKEN
      );
    }

    // Hash the new password and save it to the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the user with the new password
    await user.save();

    return ResponseUtil.sendSuccess(res, null, MessageUtil.USER.PASSWORD_RESET_SUCCESSFUL);
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.INTERNAL_SERVER_ERROR,
      MessageUtil.USER.INVALID_RESET_TOKEN
    );
  }
};


module.exports = userController;

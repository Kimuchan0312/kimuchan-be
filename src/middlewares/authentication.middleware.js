const jwt = require("jsonwebtoken");
const { ResponseUtil, MessageUtil } = require("../utils");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authentication = {};

authentication.loginRequired = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.UNAUTHORIZED,
      MessageUtil.TOKEN_NOT_PROVIDED
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.UNAUTHORIZED,
      MessageUtil.TOKEN_INVALID
    );
  }
};

authentication.authenticateUserAndAdmin = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.UNAUTHORIZED,
      MessageUtil.TOKEN_NOT_PROVIDED
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(decoded.user._id);

    if (!user) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.UNAUTHORIZED,
        MessageUtil.USER.USER_NOT_FOUND
      );
    }

    if (!user || !decoded) {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.UNAUTHORIZED,
        MessageUtil.TOKEN_INVALID
      );
    }

    if (user.role !== "admin") {
      return ResponseUtil.sendError(
        res,
        ResponseUtil.FORBIDDEN,
        MessageUtil.USER.PERMISSION_DENIED_NON_ADMIN_USER
      );
    }
    
    req.user = user;
    next();
  } catch (error) {
    return ResponseUtil.sendError(
      res,
      ResponseUtil.UNAUTHORIZED,
      MessageUtil.TOKEN_INVALID
    );
  }
};

module.exports = authentication;

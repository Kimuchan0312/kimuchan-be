const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const { authentication } = require("../middlewares");

router.post("/", UserController.register);

router.put(
  "/users/:userId",
  authentication.loginRequired,
  UserController.updateUser
);
router.get(
  "/users/:userId",
  authentication.loginRequired,
  UserController.getOneUser
);
router.get(
  "/users",
  authentication.authenticateUserAndAdmin,
  UserController.getAllUsers
);

router.delete(
  "/users/:userId",
  authentication.authenticateUserAndAdmin,
  UserController.deleteUser
);

// TODO: setup email server to run this API
// router.post("/forget-password", UserController.initiatePasswordReset);
// router.post("/reset-password", UserController.resetPassword);

module.exports = router;

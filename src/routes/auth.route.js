const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const authentication = require("../middlewares/authentication.middleware");
const validators = require('../middlewares/validators');
const { ResponseUtil } = require('../utils'); 

/**
 * @route POST /auth/login
 * @description Log in with email and password
 * @body {email, passsword}
 * @access Public
 */
router.post(
  "/login",
  validators.validate([
    body("email")
      .trim()
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false })
      .withMessage("Invalid email"),
    body("password")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("Password is required"),
  ]),
  authController.login
);

/**
 * @route PUT /auth/setup/:token
 * @description Set up account
 * @body {userName, email, passsword}
 * @access Public
 */
router.put(
  "/setup/:token",
  authentication.loginRequired,
  validators.validate([
    body("userName", "User Name is required").trim().exists().notEmpty(),
    body("email")
      .trim()
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false })
      .withMessage("Invalid email"),
    body("password")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password is at least 5 characters"),
  ]),
  authController.accountSetup
);

/**
 * @route DELETE /auth/logout
 * @description Log out
 * @access Private, login require
 */
router.delete("/logout", authentication.loginRequired, authController.logout);

module.exports = router;
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { ResponseUtil } = require('../utils'); // Import ResponseUtil

const validators = {};

validators.validate = (validationArray) => async (req, res, next) => {
  await Promise.all(validationArray.map((validation) => validation.run(req)));
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const message = errors
    .array()
    .map((error) => error.msg)
    .join(" & ");
  return ResponseUtil.sendError(res, 500, { message }, "Validation Error"); 
};

// Check if the ID matches the MongoDB ObjectId format
validators.checkObjectId = (paramId) => {
  if (!mongoose.Types.ObjectId.isValid(paramId)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
};

module.exports = validators;
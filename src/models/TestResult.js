const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    totalScore: { type: Number, required: true },
    lessonResults: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
  },
  { timestamps: true }
);

const TestResult = mongoose.model("TestResult", testResultSchema);

module.exports = TestResult;

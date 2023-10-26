const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    activityType: {
      type: String,
      enum: ["readingLesson", "test"],
      required: true,
    },
    activityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, default: null },
    details: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

module.exports = UserActivity;

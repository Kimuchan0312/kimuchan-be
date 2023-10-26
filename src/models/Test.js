const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    lessons: [
      {
        readingLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'ReadingLesson', required: true },
        order: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
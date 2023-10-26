const mongoose = require('mongoose');


const singleReadingResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    readingLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'ReadingLesson', required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    incorrectAnswers: { type: Number, required: true },
    retryCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Result = mongoose.model('SingleReadingResult', singleReadingResultSchema);

module.exports = Result;
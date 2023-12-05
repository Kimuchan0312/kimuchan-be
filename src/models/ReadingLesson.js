const mongoose = require("mongoose");

const readingLessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    jlptLevel: { type: String, enum: ['N1', 'N2', 'N3', 'N4', 'N5'], default: 'N5' },
    vocabulary: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary', required: true }],
    questions: [
      {
        question: { type: String, required: true },
        type: {
          type: String,
          enum: ["single-answer", "multiple-answer"],
          required: true,
        },
        options: [{ type: String, required: true }],
        correctAnswer: { type: [String], required: true }, // For multiple-answer questions
      },
    ],
  },
  { timestamps: true }
);

// Use "ReadingLesson" as the model name
const ReadingLesson = mongoose.model("ReadingLesson", readingLessonSchema);

module.exports = ReadingLesson;

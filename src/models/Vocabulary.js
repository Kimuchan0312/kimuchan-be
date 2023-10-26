const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    pronunciation: { type: String, required: true },
    meaning: { type: String, required: true },
    jlptLevel: { type: Number, enum: ['N1', 'N2', 'N3', 'N4', 'N5'], default: 'N5' },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    exampleSentence: { type: String, default: null },
    audioUrl: { type: String, default: null },
  },
  { timestamps: true }
);

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);

module.exports = Vocabulary;

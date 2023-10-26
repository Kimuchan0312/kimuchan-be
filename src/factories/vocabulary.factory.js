const mongoose = require('mongoose');
const Vocabulary = require('../models/Vocabulary');

class VocabularyFactory {
  static validateVocabularyData(data) {
    const { word, pronunciation, meaning, jlptLevel, categories, exampleSentence, audioUrl } = data;

    // Validation logic
    if (!word || !pronunciation || !meaning || !jlptLevel) {
      throw new Error('Word, pronunciation, meaning, and JLPT level are required fields.');
    }

    // Validate category IDs
    if (categories && !Array.isArray(categories)) {
      throw new Error('Categories must be an array.');
    }

    const areValidCategoryIds = categories.every(categoryId => mongoose.Types.ObjectId.isValid(categoryId));
    if (!areValidCategoryIds) {
      throw new Error('Invalid category ID(s) provided.');
    }

    // Additional validation based on your specific requirements
    // For example, you might want to ensure that the audio URL follows a certain format.
  }

  static createVocabulary(data) {
    try {
      // Validate the data
      this.validateVocabularyData(data);

      // Create and return the vocabulary object
      return new Vocabulary(data);
    } catch (error) {
      throw error;
    }
  }

  static async getAllVocabularies({ page = 1, pageSize = 10, word, jlptLevel }) {
    try {
      // Building the filter object based on query parameters
      const filter = {};
      if (word) {
        filter.word = { $regex: new RegExp(word, 'i') }; // Case-insensitive regex search
      }
      if (jlptLevel) {
        filter.jlptLevel = jlptLevel;
      }

      const vocabularies = await Vocabulary.find(filter)
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize, 10))
        .exec();

      return vocabularies;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VocabularyFactory;
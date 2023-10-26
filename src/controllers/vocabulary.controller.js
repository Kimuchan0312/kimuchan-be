const Vocabulary = require("../models/Vocabulary");
const VocabularyFactory = require('../factories/vocabulary.factory');

// Create a new vocabulary
const createVocabulary = async (req, res) => {
  try {
    // Use the factory to create a validated vocabulary object
    const vocabulary = VocabularyFactory.createVocabulary(req.body);

    // Save the vocabulary object to the database
    const savedVocabulary = await vocabulary.save();

    return res.status(201).json(savedVocabulary);
  } catch (error) {
    // Handle validation errors or other failures
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }
    return res.status(500).json({ error: 'Failed to create vocabulary', details: error.message });
  }
};

// Get all vocabularies
const getAllVocabularies = async (req, res) => {
  try {
    const { page, pageSize, word, jlptLevel } = req.query;

    // Use the factory method to fetch vocabularies
    const vocabularies = await VocabularyFactory.getAllVocabularies({
      page,
      pageSize,
      word,
      jlptLevel,
    });

    return res.status(200).json(vocabularies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch vocabularies", details: error.message });
  }
};

// Get a single vocabulary by ID
const getVocabularyById = async (req, res) => {
  const vocabularyId = req.params.id;

  try {
    const vocabulary = await Vocabulary.findById(vocabularyId);
    if (!vocabulary) {
      return res.status(404).json({ error: "Vocabulary not found" });
    }
    return res.status(200).json(vocabulary);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch vocabulary", details: error.message });
  }
};

// Update a vocabulary by ID
const updateVocabularyById = async (req, res) => {
  const vocabularyId = req.params.id;

  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(
      vocabularyId,
      req.body,
      { new: true }
    );
    if (!vocabulary) {
      return res.status(404).json({ error: "Vocabulary not found" });
    }
    return res.status(200).json(vocabulary);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update vocabulary", details: error.message });
  }
};

// Delete a vocabulary by ID
const deleteVocabularyById = async (req, res) => {
  const vocabularyId = req.params.id;

  try {
    const vocabulary = await Vocabulary.findByIdAndDelete(vocabularyId);
    if (!vocabulary) {
      return res.status(404).json({ error: "Vocabulary not found" });
    }
    return res.status(204).send(); // No content
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to delete vocabulary", details: error.message });
  }
};

module.exports = {
  createVocabulary,
  getAllVocabularies,
  getVocabularyById,
  updateVocabularyById,
  deleteVocabularyById,
};

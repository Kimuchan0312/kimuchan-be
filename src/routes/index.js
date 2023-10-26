const express = require('express');

const emojis = require('./sample.route.js');
const user = require('./user.route.js');
const category = require('./category.route.js');
const readingLesson = require('./readingLesson.route.js');
// const test = require('./test.route.js');
// const testResult = require('./testResult.route.js');
// const userActivity = require('./userActivity.route.js');
// const result = require('./result.route.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/users', user);
router.use('/categories', category);
router.use('/reading-lessons', readingLesson);
// router.use('/tests', test);
// router.use('/results', result);
// router.use('/test-results', testResult);
// router.use('/user-activities', userActivity);

module.exports = router;

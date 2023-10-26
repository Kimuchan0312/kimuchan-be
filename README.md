## Docker Notes

- docker build . -t subin/node-web-app
- docker images
- docker run -p 49160:8080 -d subin/node-web-app
- docker ps
- docker logs <container id>
- docker exec -it <container id> /bin/bash -> enter container id

ref: https://nodejs.org/en/docs/guides/nodejs-docker-webapp

## Mongodb

testuser1/rip4Cao2NcIQSUfz

- User

```
[
  {
    email: 'john.doe@example.com',
    password: 'hashed_password_123',
    username: 'john_doe',
    googleId: null,
    avatarUrl: 'https://example.com/john_doe_avatar.jpg',
    role: 'user',
    resetPasswordToken: null,
    resetPasswordExpires: null,
    isDeleted: false,
    createdAt: '2023-01-01T12:00:00.000Z', // Auto-generated timestamp
    updatedAt: '2023-01-01T12:00:00.000Z', // Auto-generated timestamp
  },
  {
    email: 'jane.smith@example.com',
    password: 'hashed_password_456',
    username: 'jane_smith',
    googleId: 'google_user_id_789',
    avatarUrl: 'https://example.com/jane_smith_avatar.jpg',
    role: 'admin',
    resetPasswordToken: null,
    resetPasswordExpires: null,
    isDeleted: false,
    createdAt: '2023-01-02T14:30:00.000Z', // Auto-generated timestamp
    updatedAt: '2023-01-02T14:30:00.000Z', // Auto-generated timestamp
  },
];

```

- Category

```
const category1 = new Category({ name: 'Greetings' });
const category2 = new Category({ name: 'Basic Phrases' });
category1.save();
category2.save();
```

- Vocabulary 

```
// Sample Vocabulary Data
const vocabulary1 = new Vocabulary({
  word: 'こんにちは',
  pronunciation: 'Konnichiwa',
  meaning: 'Hello',
  jlptLevel: 'N5',
  categories: [category1._id],
  exampleSentence: 'こんにちは、元気ですか？',
  audioUrl: 'https://example.com/konnichiwa-audio.mp3',
});
vocabulary1.save();

const vocabulary2 = new Vocabulary({
  word: 'ありがとう',
  pronunciation: 'Arigatou',
  meaning: 'Thank you',
  jlptLevel: 'N5',
  categories: [category2._id],
  exampleSentence: 'ありがとう、助かります。',
  audioUrl: 'https://example.com/arigatou-audio.mp3',
});
vocabulary2.save();
```


- Reading

```
// Sample Reading Lesson Data
const readingLesson = new ReadingLesson({
  title: '日本の文化',
  content: '日本は四季折々の美しい自然と、古くから伝わる伝統文化が魅力的な国です。',
  jlptLevel: 2,
  vocabulary: [vocabulary1],
  questions: [
    {
      question: '日本の挨拶で使われる言葉は何ですか？',
      type: 'single-answer',
      options: ['ありがとう', 'こんにちは', 'さようなら'],
      correctAnswer: 'こんにちは',
    },
    {
      question: '日本の主食は何ですか？',
      type: 'multiple-answer',
      options: ['寿司', 'ラーメン', 'うどん', 'ピザ'],
      correctAnswer: ['寿司', 'ラーメン', 'うどん'],
    },
  ],
});
readingLesson.save();
```

- Reading Result

```
const newResult = new Result({
  user: userId, 
  readingLesson: lessonId, 
  score: 80, 
  totalQuestions: 10,
  correctAnswers: 8, 
  incorrectAnswers: 2
  retryCount: 1,
});

newResult.save();
```

- Test

```
const test = new Test({
  title: 'Japanese Test',
  description: 'A test to evaluate Japanese reading skills.',
  lessons: [
    { readingLesson: lesson1._id, order: 1 },
    { readingLesson: lesson2._id, order: 2 },
    // Add more lessons as needed
  ],
});

test.save();
```

- Test result

```
// Assuming you have user ID, test ID, and individual lesson results
const userId = 'user123';
const testId = 'test123';
const lessonResults = [
  {
    lesson: 'lesson1', // Replace with actual lesson ID
    score: 80,
    totalQuestions: 10,
    correctAnswers: 8,
    incorrectAnswers: 2,
  },
  // Add results for other lessons in the test as needed
];

// Create a TestResult document
const testResult = new TestResult({
  user: userId,
  test: testId,
  totalScore: 160, // Adjust based on your scoring system
  lessonResults: lessonResults,
});

testResult.save();

```

- User Activity


```
// Example usage for reading lesson activity
const readingLessonActivity = new UserActivity({
  user: userId,
  activityType: 'readingLesson',
  activityId: readingLessonId,
  startTime: new Date(),
  endTime: new Date(),
  details: {
    lessonTitle: 'Lesson 1',
    score: 80,
  },
});

readingLessonActivity.save((err, savedActivity) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Reading Lesson Activity saved:', savedActivity);
  }
});

// Example usage for test activity
const testActivity = new UserActivity({
  user: userId,
  activityType: 'test',
  activityId: testId,
  startTime: new Date(),
  endTime: null,
  details: {
    testTitle: 'Japanese Test',
  },
});

testActivity.save();
```

- Friendship

```
// Assuming you have user IDs
const userId1 = 'user123';
const userId2 = 'user456';

// Create a Friendship request
const friendshipRequest = new Friendship({
  user1: userId1,
  user2: userId2,
  status: 'pending',
});

friendshipRequest.save((err, savedFriendship) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Friendship Request saved:', savedFriendship);
  }
});

// When the friend request is accepted
Friendship.findOneAndUpdate(
  { user1: userId1, user2: userId2, status: 'pending' },
  { status: 'accepted' },
  { new: true },
  (err, updatedFriendship) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Friendship Accepted:', updatedFriendship);
    }
  }
);

// When the friend request is rejected
Friendship.findOneAndUpdate(
  { user1: userId1, user2: userId2, status: 'pending' },
  { status: 'rejected' },
  { new: true },
  (err, updatedFriendship) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Friendship Rejected:', updatedFriendship);
    }
  }
);

```# kimuchan-be

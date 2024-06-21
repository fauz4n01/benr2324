const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  // Add more questions here
];

MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db();
    db.collection('questions').insertMany(questions)
      .then(result => {
        console.log(`Inserted ${result.insertedCount} questions`);
        client.close();
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));

const { ObjectId } = require('mongodb');

const saveScore = async (req, res) => {
  const db = req.app.locals.db;
  const score = req.body;

  try {
    const result = await db.collection('scores').insertOne(score);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getScores = async (req, res) => {
  const db = req.app.locals.db;
  const { username } = req.body;

  try {
    const scores = await db.collection('scores').find({ username }).toArray();
    res.json(scores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateScore = async (req, res) => {
  const db = req.app.locals.db;
  const { username } = req.body;
  const update = req.body;

  try {
    const result = await db.collection('scores').updateOne({ username}, { $set: update });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteScore = async (req, res) => {
  const db = req.app.locals.db;
  const username = req.params.username;

  try {
    const result = await db.collection('scores').deleteOne({ username });

    if (result.deletedCount === 0) {
      console.error('Score not found:', username);
      return res.status(404).json({ error: 'Score not found' });
    }

    console.log('Score deleted successfully:', username);
    res.status(200).json({ message: 'Score deleted successfully' });
  } catch (error) {
    console.error('Delete Score Error:', error);
    res.status(500).json({ error: 'An error occurred while deleting the score' });
  }
};

const submitAnswers = async (req, res) => {
  const db = req.app.locals.db;
  const { username, answers } = req.body;

  try {
    // Fetch all questions
    const questions = await db.collection('question').find({}).toArray();

    if (questions.length !== answers.length) {
      return res.status(400).send('Number of answers does not match number of questions');
    }

    // Calculate score
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAnswer === answers[i]) {
        score++;
      }
    }

    // Save score to the database
    const result = await db.collection('scores').insertOne({ username, score, date: new Date() });

    res.status(201).json({ message: 'Score submitted successfully', score });
  } catch (error) {
    console.error('Submit Answers Error:', error);
    res.status(500).json({ error: 'An error occurred while submitting the answers' });
  }
};


module.exports = { saveScore, getScores, updateScore, deleteScore, submitAnswers };
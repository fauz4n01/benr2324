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
  const { userId } = req.params;

  try {
    const scores = await db.collection('scores').find({ userId: new ObjectId(userId) }).toArray();
    res.json(scores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateScore = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const update = req.body;

  try {
    const result = await db.collection('scores').updateOne({ _id: new ObjectId(id) }, { $set: update });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteScore = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const result = await db.collection('scores').deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const submitAnswers = async (req, res) => {
  const db = req.app.locals.db;
  const { userId, answers } = req.body;

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
    const result = await db.collection('scores').insertOne({ userId: new ObjectId(userId), score, date: new Date() });

    res.status(201).json({ message: 'Score submitted successfully', score });
  } catch (error) {
    console.error('Submit Answers Error:', error);
    res.status(500).json({ error: 'An error occurred while submitting the answers' });
  }
};


module.exports = { saveScore, getScores, updateScore, deleteScore, submitAnswers };
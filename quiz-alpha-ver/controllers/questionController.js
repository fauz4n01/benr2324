const { ObjectId } = require('mongodb');

const fetchQuestions = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const questions = await db.collection('question').find({}, { projection: { correctAnswer: 0 } }).toArray();
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createQuestion = async (req, res) => {
  const db = req.app.locals.db;
  const question = req.body;

  try {
    const result = await db.collection('question').insertOne(question);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const update = req.body;

  try {
    const result = await db.collection('question').updateOne({ _id: new ObjectId(id) }, { $set: update });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const result = await db.collection('question').deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { fetchQuestions, createQuestion, updateQuestion, deleteQuestion };

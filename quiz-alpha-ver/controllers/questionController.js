const { ObjectId } = require('mongodb');

const fetchQuestions = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const questions = await db.collection('question').find({}, { projection: { correctAnswer: 0, _id: 0 } }).toArray();
    res.send(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createQuestion = async (req, res) => {
  const db = req.app.locals.db;
  const question = req.body;

  try {
    const result = await db.collection('question').insertOne(question);
    res.status(201).send(result);
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
  const questionId = req.params.questionId;

  try {
    // Ensure the questionId is a valid ObjectId
    if (!ObjectId.isValid(questionId)) {
      return res.status(400).json({ error: 'Invalid question ID' });
    }

    // Delete the question from the database
    const result = await db.collection('question').deleteOne({ _id: new ObjectId(questionId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    console.log('Question deleted successfully:', questionId);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Delete Question Error:', error);
    res.status(500).json({ error: 'An error occurred while deleting the question' });
  }
};

module.exports = { fetchQuestions, createQuestion, updateQuestion, deleteQuestion };

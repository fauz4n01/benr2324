const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { fetchQuestions, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const { saveScore, getScores, updateScore, deleteScore, submitAnswers } = require('../controllers/scoreController');
const { authenticateToken } = require('../middleware');

console.log('Imported Controllers:', {
    registerUser, loginUser, getUser, updateUser, deleteUser,
    fetchQuestions, createQuestion, updateQuestion, deleteQuestion,
    saveScore, getScores, updateScore, deleteScore, submitAnswers
  });

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', authenticateToken, getUser);
router.put('/user/:id', authenticateToken, updateUser);
router.delete('/user/:id', authenticateToken, deleteUser);

// Question routes
router.get('/questions', authenticateToken, fetchQuestions);
router.post('/questions', authenticateToken, createQuestion);
router.put('/questions/:id', authenticateToken, updateQuestion);
router.delete('/questions/:id', authenticateToken, deleteQuestion);

// Score routes
router.post('/scores', authenticateToken, saveScore);
router.get('/scores/:userId', authenticateToken, getScores);
router.put('/scores/:id', authenticateToken, updateScore);
router.delete('/scores/:id', authenticateToken, deleteScore);
router.post('/submit', authenticateToken, submitAnswers);

module.exports = router;

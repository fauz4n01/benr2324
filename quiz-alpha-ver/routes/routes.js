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
router.get('/user/info', authenticateToken, getUser);
router.patch('/user/update', authenticateToken, updateUser);
router.delete('/user/:username', deleteUser);

// Question routes
router.get('/questions', authenticateToken, fetchQuestions);
router.post('/questions', authenticateToken, createQuestion);
router.patch('/questions/update', authenticateToken, updateQuestion);
router.delete('/questions/:questionId', deleteQuestion);

// Score routes
router.post('/scores', authenticateToken, saveScore);
router.get('/scores/info', authenticateToken, getScores);
router.patch('/scores/update', authenticateToken, updateScore);
router.delete('/scores/:username', deleteScore);
router.post('/submit', authenticateToken, submitAnswers);

module.exports = router;

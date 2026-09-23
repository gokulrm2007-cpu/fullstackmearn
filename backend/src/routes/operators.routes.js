const express = require('express');
const router = express.Router();
const operatorsController = require('../controllers/operators.controller');

// GET /api/operators/demo - Run complete source test suites (a=30/b=38, a=20/b=39, a=20/b=40)
router.get('/demo', operatorsController.runSourceDemo);

// GET /api/operators/arithmetic - Arithmetic operations
router.get('/arithmetic', operatorsController.getArithmetic);

// GET /api/operators/assignment - Assignment operations
router.get('/assignment', operatorsController.getAssignment);

// GET /api/operators/comparison - Comparison operations
router.get('/comparison', operatorsController.getComparison);

// POST /api/operators/history - Save calculation history
router.post('/history', operatorsController.saveCalculation);

// GET /api/operators/history - Get calculation history
router.get('/history', operatorsController.getHistory);

module.exports = router;

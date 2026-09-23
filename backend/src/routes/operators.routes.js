const express = require('express');
const router = express.Router();
const operatorsController = require('../controllers/operators.controller');

// GET /api/operators/demo - Run complete source suite
router.get('/demo', operatorsController.runSourceDemo);

// GET /api/operators/arithmetic
router.get('/arithmetic', operatorsController.getArithmetic);

// GET /api/operators/assignment
router.get('/assignment', operatorsController.getAssignment);

// GET /api/operators/comparison
router.get('/comparison', operatorsController.getComparison);

// GET /api/operators/logical
router.get('/logical', operatorsController.getLogical);

// GET /api/operators/unary
router.get('/unary', operatorsController.getUnary);

// GET /api/operators/ternary
router.get('/ternary', operatorsController.getTernary);

// POST /api/operators/history - Save calculation history
router.post('/history', operatorsController.saveCalculation);

// GET /api/operators/history - Get calculation history
router.get('/history', operatorsController.getHistory);

module.exports = router;

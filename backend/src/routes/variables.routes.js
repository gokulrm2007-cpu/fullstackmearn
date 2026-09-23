const express = require('express');
const router = express.Router();
const variablesController = require('../controllers/variables.controller');

// GET /api/variables - Get current variable values & scope explanations
router.get('/', variablesController.getVariables);

// POST /api/variables - Update variable values
router.post('/', variablesController.updateVariables);

// GET /api/variables/scope-test - Run simulation of block scoping & const mutability
router.get('/scope-test', variablesController.testScope);

module.exports = router;

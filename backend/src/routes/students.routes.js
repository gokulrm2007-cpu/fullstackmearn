const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students.controller');

// GET /api/students/es6 - ES6 concepts demo
router.get('/es6', studentsController.getES6Demo);

// GET /api/students/async-demo - Async/Await & Promise simulation
router.get('/async-demo', studentsController.getAsyncStudent);

// GET /api/students/fetch-mock - Mock JSONPlaceholder endpoint (fech-app.html)
router.get('/fetch-mock', studentsController.getFetchMock);

// GET /api/students - List all students
router.get('/', studentsController.getAllStudents);

// POST /api/students - Create a student
router.post('/', studentsController.addStudent);

module.exports = router;

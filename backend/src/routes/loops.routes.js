const express = require('express');
const router = express.Router();
const loopsController = require('../controllers/loops.controller');

router.get('/', loopsController.getLoopsDemo);

module.exports = router;

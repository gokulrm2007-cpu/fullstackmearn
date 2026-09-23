const express = require('express');
const router = express.Router();
const datatypesController = require('../controllers/datatypes.controller');

router.get('/', datatypesController.getDataTypes);

module.exports = router;

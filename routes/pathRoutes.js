const express = require('express');
const pathController = require('../controllers/pathController');
const router = express.Router();

//get all tours
router.route('/').get(pathController.getAllPaths);

module.exports = router;
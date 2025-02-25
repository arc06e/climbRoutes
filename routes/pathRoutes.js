const express = require('express');
const pathController = require('../controllers/pathController');
const router = express.Router();

//indoors
router
    .route('/indoor-paths')
    .get(pathController.getIndoorPaths);

//paths
router
    .route('/')
    .get(pathController.getAllPaths) //R All
    .post(pathController.createPath); //C One

//get one path
router
    .route('/:id')
    .get(pathController.getPath) //R One
    .patch(pathController.updatePath) //U One
    .delete(pathController.deletePath); //D One

module.exports = router;
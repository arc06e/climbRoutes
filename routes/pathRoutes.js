const express = require('express');
const pathController = require('../controllers/pathController');
const router = express.Router();

//tours
router
    .route('/')
    .get(pathController.getAllPaths) //R All
    .post(pathController.createPath); //C One

//get one tour
router
    .route('/:id')
    .get(pathController.getPath) //R One
    .patch(pathController.updatePath) //U One
    .delete(pathController.deletePath);
    
module.exports = router;
const climberController = require('../controllers/climberController');
const express = require('express');
const router = express.Router();


router
    .route('/')
    .get(climberController.getAllClimbers)
    .post(climberController.createClimber);

router
    .route('/:id')
    .get(climberController.getClimber)
    .patch(climberController.updateClimber)
    .delete(climberController.deleteClimber);

module.exports = router;
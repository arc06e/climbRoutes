const climberController = require('../controllers/climberController');
const authController = require('../../../shared/controllers/authController');
const express = require('express');
const router = express.Router();

//Does not follow REST architecture 
router.post('/signup', authController.signup);
router.post('/login', authController.login);

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
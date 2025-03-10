const express = require('express');
//const pathController = require('../controllers/pathController');
const climbingRouteController = require('../controllers/climbingRouteController');
const router = express.Router();

//indoors
// router
//     .route('/indoor-paths')
//     .get(pathController.getIndoorPaths);

//climbing routes
router
    .route('/')
    // .get(pathController.getAllPaths) //R All
    // .post(pathController.createPath); //C One
    .get(climbingRouteController.getAllClimbingRoutes)
    .post(climbingRouteController.createClimbingRoute);

router
    .route('/:id')
    .get(climbingRouteController.getClimbingRoute)
    .patch(climbingRouteController.updateClimbingRoute)
    .delete(climbingRouteController.deleteClimbingRoute);

//get one path
// router
//     .route('/:id')
//     .get(pathController.getPath) //R One
//     .patch(pathController.updatePath) //U One
//     .delete(pathController.deletePath); //D One




module.exports = router;
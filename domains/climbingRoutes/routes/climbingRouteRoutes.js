const express = require('express');
const climbingRouteController = require('../controllers/climbingRouteController');
const router = express.Router();

//More Specific Routes Should Be Defined First: 
//If you have routes that are more specific (like routes with parameters), you should define them before more general routes to avoid conflicts.

//climbing routes
router
    .route('/indoors')
    .get(climbingRouteController.getAllClimbingRoutesByLocation);

router
    .route('/outdoors')
    .get(climbingRouteController.getAllClimbingRoutesByLocation);

router
.route('/:id')
    .get(climbingRouteController.getClimbingRoute)
    .patch(climbingRouteController.updateClimbingRoute)
    .delete(climbingRouteController.deleteClimbingRoute);
    
router
    .route('/')
    .get(climbingRouteController.getAllClimbingRoutes)
    .post(climbingRouteController.createClimbingRoute);

    module.exports = router;
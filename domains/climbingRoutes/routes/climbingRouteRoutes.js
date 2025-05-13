const express = require('express');
const climbingRouteController = require('../controllers/climbingRouteController');
const authService = require('../../../shared/services/auth');
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
    .get(authService.protect, climbingRouteController.getClimbingRoute)
    .patch(authService.protect, climbingRouteController.updateClimbingRoute)
    .delete(authService.protect, climbingRouteController.deleteClimbingRoute);
    
router
    .route('/')
    .get(authService.protect, climbingRouteController.getAllClimbingRoutes)
    .post(authService.protect, climbingRouteController.createClimbingRoute);

    module.exports = router;
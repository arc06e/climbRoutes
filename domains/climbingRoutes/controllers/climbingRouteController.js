const climbingRoutesService = require('../climbingRoutes');

//TODO: need to refactor this controller to pass only the necessary properties into the service layer

//CREATE 
exports.createClimbingRoute = async (req, res, next) => {
    try {
        const newClimbingRoute = await climbingRoutesService.createNewClimbingRoute(req);
        res.status(201).json({
            status: 'successfully created climbing route',
            climbingRoute: newClimbingRoute
        });
    } catch (error) {
        //If an error is passed into next(), it jumps straight into the global error handling middlewhere (what we set up in app.js)
        //the error we pass in here is the custom AppError object we created
        next(error);
    }
}

//READ ALL 
exports.getAllClimbingRoutes = async (req, res, next) => {
    const climbingRoutes = await climbingRoutesService.getAllClimbingRoutes();
    
    try {
        res.status(200).json({
            status: 'success',
            results: climbingRoutes.length,
            data: {
                climbingRoutes: climbingRoutes
            }
        });
    } catch (error) {
        next(error);
    }
};

//READ ONE
exports.getClimbingRoute = async (req, res, next) => {
    try {
        const climbingRoute = await climbingRoutesService.getClimbingRoute(req);
        res.status(200).json({
            status: 'success',
            data: {
                climbingRoute
            }
        });
        
    } catch (error) {

        next(error);
    }
}

//UPDATE 
exports.updateClimbingRoute = async (req, res, next) => {
    try {
        const updatedClimbingRoute = await climbingRoutesService.updateClimbingRoute(req);
        res.status(200).json({
            status: 'successfully updated climbing route',
            data: {
                updatedClimbingRoute
            }
        });
    } catch (error) {
        next(error);
    }
}

//DELETE
exports.deleteClimbingRoute = async (req, res, next) => {
    try {
        const deletedClimbingRoute = await climbingRoutesService.deleteClimbingRoute(req);
        res.status(204).json({
            status: "successfully deleted climbing route",
            data: null
        });
    } catch (error) {
        next(error);
    }
};

//READ ROUTES BY LOCATION
exports.getAllClimbingRoutesByLocation = async (req, res, next) => {
    try {

        let isIndoors;
        let location; 

        if(req.url === '/indoors') {
            isIndoors = true;
            location = 'indoors'
        } else if(req.url === '/outdoors') {
            isIndoors = false;
            location = 'outdoors' 
        }

        const indoorClimbingRoutes = await climbingRoutesService.getAllClimbingRoutesByLocation(req, null, null, isIndoors);        
        res.status(200).json({
            status: `successfully retrieved all ${location} routes`,
            results: indoorClimbingRoutes.length,
            data: {
                indoorClimbingRoutes
            }
        });
    } catch (error) {
        next(error);
    }

};

// //READ INDOOR PATHS
// exports.getIndoorPaths = catchAsync(async (req, res, next) => {
//     const indoorPaths = await Path.aggregate([
//         {//stage 1: match all paths/documents that are indoors
//             $match: {indoors: true}
//         },
//         {//stage 2: group returned paths/documents by site            
//             $group: {
//                 _id: '$site',
//                 paths: {
//                     $push: {
//                         name: '$name',
//                         grade: '$grade',
//                         color: '$color'
//                     }
//                 },
//                 num: {$sum: 1}
//             }        
//         },
//         {
//             //stage 3: deconstructs the paths array to work with individual paths
//             $unwind: '$paths'
//         },
//         {
//             //stage 4: group by grade within each site
//             $group: {
//                 _id: {
//                     site: '$_id', 
//                     grade: '$paths.grade'
//                 },
//                 paths: {
//                     $push: {
//                         name: '$paths.name',
//                         color: '$paths.color'
//                 }
//             },
//             grade: {$first: '$paths.grade'}, //ensure each grade is displayed for each group
//             num: {$sum: 1}
//             }
//         },
//         {
//             //stage 5: group by site to group the grades together
//             $group: {
//                 _id: '$_id.site',
//                 grades: {
//                     $push: {
//                         grade: '$grade',
//                         path: '$paths',
//                         num: '$num'
//                     }
//                 }
//             }
//         }
//     ]);

//     res.status(200).json({
//         status: 'successfully retrieved all indoor paths',
//         results: indoorPaths.length,
//         data: {
//             indoorPaths
//         }
//     });
// });
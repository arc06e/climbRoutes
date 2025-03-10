const climbingRoutesService = require('../climbingRoutes');


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

}

//CREATE
// exports.createPath = catchAsync(async (req, res, next) => {
//     //console.log(req.body);
//     const newPath = await Path.create(req.body);

//     res.status(201).json({
//         status: 'successfully created path',
//         path: newPath      
//     })

// });

// //READ ALL 
// exports.getAllPaths = catchAsync(async (req, res, next) => {
//     const paths = await Path.find();

//         res.status(200).json({
//             results: paths.length,
//             paths
//         });
// });

// //READ ONE
// exports.getPath = catchAsync(async (req, res, next) => {
//     const path = await Path.findById(req.params.id);

//     if (!path) {
//         return next(new AppError('No path found with that ID', 404))
//     }

//     res.status(200).json({
//         status: 'success',
//         results: path.length,
//         path
//     });
// });

// //UPDATE ONE
// exports.updatePath = catchAsync(async (req, res, next) => {
//     const updatedPath = await Path.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     if (!path) {
//         return next(new AppError('No path found with that ID', 404))
//     }

//     res.status(200).json({
//         status: 'successfully updated path',
//         updatedPath
//     });
// });

// //DELETE ONE
// exports.deletePath = async (req, res, next) => {
//     const path = await Path.findByIdAndDelete(req.params.id);

//     if (!path) {
//         return next(new AppError('No path found with that ID', 404))
//     }

//     res.status(204).json({});
// };

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
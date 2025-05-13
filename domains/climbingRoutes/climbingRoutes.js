//const errorController = require('/Users/adamcushing/Projects/climbRoutes/shared/controllers/errorController');
const ClimbingRoute = require('../climbingRoutes/models/climbingRouteModel');
const AppError = require('/Users/adamcushing/Projects/climbRoutes/shared/utils/appError');

exports.createNewClimbingRoute = async (req, res, next) => {
    //console.log(req.body);
    try {
        const newClimbingRoute = await ClimbingRoute.create(req.body);
        return newClimbingRoute;
    } catch (error) {
        //if there is a validation error, this catch block will catch the error thrown by mongoose;
        //creates new error object from mongoose error
        //throw new AppError(error, '404');
        throw error;
    }
}

exports.getAllClimbingRoutes = async () => {
    try {
        const climbingRoutes = await ClimbingRoute.find();
        return climbingRoutes;
    } catch (error) {
        throw new AppError(error, '404');
    }
}

exports.getClimbingRoute = async (req, res, next) => {
    try {
        const climbingRoute = await ClimbingRoute.findById(req.params.id);
        return climbingRoute;
    } catch (error) {
        //throw new AppError(error, '404');
        throw error; 
    }
}

exports.updateClimbingRoute = async (req, res, next) => {
    try {
        const updateClimbingRoute = await ClimbingRoute.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        return updateClimbingRoute;
    } catch (error) {
        throw error;
    }
}

exports.deleteClimbingRoute = async (req, res, next) => {
    try {
        const deletedClimbingRoute = await ClimbingRoute.findByIdAndDelete(req.params.id);
        return deletedClimbingRoute;
    } catch (error) {
        throw error; 
    }
}

exports.getAllClimbingRoutesByLocation = async (req, res, next, isIndoors) => {
    try {
        const climbingRoutesByLocation = await ClimbingRoute.aggregate([
            {//stage 1: match all routes/documents by whether or not they are indoors
                $match: {indoors: isIndoors}
            },
            {//stage 2: group returned routes/documents by site            
                $group: {
                    _id: '$site',
                    routes: {
                        $push: {
                            name: '$name',
                            grade: '$grade',
                            color: '$color'
                        }
                    },
                    num: {$sum: 1}
                }        
            },
            {
                //stage 3: deconstructs the routes array to work with individual paths
                $unwind: '$routes'
            },
            {
                //stage 4: group by grade within each site
                $group: {
                    _id: {
                        site: '$_id', 
                        grade: '$routes.grade'
                    },
                    paths: {
                        $push: {
                            name: '$routes.name',
                            color: '$routes.color'
                    }
                },
                grade: {$first: '$routes.grade'}, //ensure each grade is displayed for each group
                num: {$sum: 1}
                }
            },
            {
                //stage 5: group by site to group the grades together
                $group: {
                    _id: '$_id.site',
                    grades: {
                        $push: {
                            grade: '$grade',
                            route: '$routes',
                            num: '$num'
                        }
                    }
                }
            }
        ]);
        return climbingRoutesByLocation;
    } catch (error) {
        throw error;
    }
}
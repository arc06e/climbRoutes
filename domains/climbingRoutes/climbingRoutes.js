const errorController = require('../../controllers/errorController');
const ClimbingRoute = require('../climbingRoutes/models/climbingRouteModel');
const AppError = require('/Users/adamcushing/Projects/climbRoutes/shared/utils/appError');

exports.createNewClimbingRoute = async (req, res, next) => {
    console.log(req.body);
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
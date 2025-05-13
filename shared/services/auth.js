const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const Climber = require('../../domains/climbers/models/climberModel');
const AppError = require('../utils/appError');

exports.signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    return token;
}

exports.protect = async (req, res, next) => {
    let token;

    //synchronous code
    //1. get token and ensure it's there
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }
    
    console.log(token);

    if(!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }
    
    try {
        //asynchronous code inside try block
        //2. verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //all this now is a function which will return a promise
        console.log(decoded);

        //3. check if user/climber still exists
        const currentClimber = await Climber.findById(decoded.id);

        if(!currentClimber) {
            return next (new AppError('The climber belonging to this token no longer exists.', 401));
        }

        //4. check if user/climber changed password after the token was issued 
        if(currentClimber.changePasswordAfter(decoded.iat)) {
            return next(new AppError('User recently changed password! Please log in again.', 401));
        }

        //grant access to protected route
        req.user = currentClimber;
        next();
    } catch (error) {

        return next(error); 
    }
    
    



}

exports.createClimber = async (req, res, next) => {
    try {
        const newClimber = await Climber.create(req);

        return newClimber;
    } catch (error) {
        throw error;
    }
}
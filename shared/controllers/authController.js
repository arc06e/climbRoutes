const Climber = require('../../domains/climbers/models/climberModel');
const ClimberService = require('../services/auth');
const AppError = require('../utils/appError');

exports.signup = async (req, res, next) => {
    try {
        //prevents inadvertant admin creation - admin role must be added manually to mongodb document 
        const newClimber = await ClimberService.createClimber({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt
        });

        const token = ClimberService.signToken(newClimber._id);

        res.status(201).json({
            status: "success",
            token,
            data: {
                climber: newClimber
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
         //const email = req.body.email;
        const {email, password} = req.body;

        //1. check if email/password exists
        if(!email || !password) {
        return next(new AppError('please provide email and password!', 400)); //need to import custom error
        }
        
        //2. check if user exists && password is correct
        const climber = await Climber.findOne({email}).select('+password');

        const correct = await climber.correctPassword(password, climber.password)

        if(!climber || !correct) {
            //by suggesting either email or password, makes the error ambiguous for malicious actors
            return next(new AppError('incorrect email or password', 401));
        }

        //3. if yes, send token to client
        const token = ClimberService.signToken(climber._id);
        res.status(200).json({
            status: 'success',
            token
    })   
    } catch (error) {
        next(error);
    }
}
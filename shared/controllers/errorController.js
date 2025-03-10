const AppError = require("/Users/adamcushing/Projects/climbRoutes/shared/utils/appError");

const handleCastErrorDB = err => {
    const message = `invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.message.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use different field value.`
    return new AppError(message, 500);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400)
}
//this is what gets sent to postman
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    //operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    //programming or other unknown error: don't leak error details
    } else {
        // 1) log error
        console.log('error', err);
        // 2) send generic message
        res.status(500).json({
            status: 'error',
            message: 'something went wrong!',
        })
    }
    
}

module.exports = (err, req, res, next) => {
    //console.log(err.stack);
    
    //Our AppError object that we created in the climbingRoutes.js module gets passed here by next()
    //we are now passing the mongoose error object into the error controller 
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error caught in errorController';

    if (process.env.NODE_ENV==='development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV==='production') {
                let error = {...err}; 
        
                //handles invalid db id
                if (err.name === 'CastError') {
                    error = handleCastErrorDB(err);
                 }
                 if (err.code === 11000) {
                     error = handleDuplicateFieldsDB(err); 
                 }
                 if(err.name === 'ValidationError') {
                     error = handleValidationErrorDB(err);
                 }
         
                 sendErrorProd(error, res);
    }
    

};


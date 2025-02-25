const AppError = require("../utils/appError");

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
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error caught in errorController';

    if (process.env.NODE_ENV==='development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV==='production') {
        //console.log(Object.getOwnPropertyDescriptor(err, 'errmsg'));
        console.log(Object.getOwnPropertyDescriptors(err));
        //object used in tutorial:
        //-- this creates a shallow copy of 'err' - prototype is not copied; error.name returns undefined. 
        //--err.errmsg is non-enumberable; not copied [errmsg seems to be legacy code, identical to .message]
        let error = {...err}; 

        //for handling invalid db id (this not work for dupl. db fields):        
        let error2 = Object.create(Object.getPrototypeOf(err)); //this copies over the mongoose CastError prototype and can thus read error.name property
        Object.assign(error2, err); //this mutates 'errorId' - rewrites properties of existing object in memory

        //handles invalid db id
        if (error2.name === 'CastError') {
           error = handleCastErrorDB(error);
        }
        // if (error.code === 11000) {
        //     error = handleDuplicateFieldsDB(error); 
        // }
        if (error.code === 11000) {
            error = handleDuplicateFieldsDB(err); 
        }
        if(error2.name === 'ValidationError') {
            error = handleValidationErrorDB(err);
        }

        sendErrorProd(error, res);
    }
    

};


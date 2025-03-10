class AppError extends Error {
    constructor(message, statusCode) {
        super(message); //super calls parent constructor

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; //our errors in here will be operational errors - we can later test for this property         

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
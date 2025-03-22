const nodemon = require('nodemon');
const express = require('express');

//const AppError = require('./utils/appError');
const AppError = require('/Users/adamcushing/Projects/climbRoutes/shared/utils/appError');
const globalErrorHandler = require('./shared/controllers/errorController');
const climbingRouteRouter = require('./domains/climbingRoutes/routes/climbingRouteRoutes');
const climberRouter = require('./domains/climbers/routes/climberRoutes');

const app = express();

//MIDDLEWARES

//built-in - parses incoming request json payload
app.use(express.json());

//ROUTES
app.use('/api/v1/climbing-routes', climbingRouteRouter);
app.use('/api/v1/climbers', climberRouter);
//error handling for bad routes -- should be last in routes section, executes in order here
app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

//error handling
app.use(globalErrorHandler);

// app.get('/', (req,res) => {
//     res.send('Hello World')
// }); 


module.exports = app;
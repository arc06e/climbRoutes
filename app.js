const nodemon = require('nodemon');
const express = require('express');

const pathRouter = require('./routes/pathRoutes');

const app = express();

//MIDDLEWARES

//built-in - parses incoming request json payload
app.use(express.json());

//ROUTES
app.use('/api/v1/paths', pathRouter);



// app.get('/', (req,res) => {
//     res.send('Hello World')
// }); 



module.exports = app;
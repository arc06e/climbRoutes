const mongoose = require('mongoose');
const dotenv = require('dotenv');

//uncaught exceptions -- if you want to catch any uncaught exceptions in the app.js file, you need to declare this code BEFORE requiring app.js
// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION: SHUTTING DOWN...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

//console.log(process.env);

dotenv.config({ path: './config.env'})
const app = require('./app');
const DB = process.env.DATABASE_LOCAL;

//console.log(DB);

mongoose.connect(DB, {/*no options*/}).then((con) => {
    //console.log(con.connections);
    console.log('DB connection successful');
});

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`listening on ${port}`);
});

//error outside of express
// process.on('unhandledRejection', err => {
//     console.log(err.name, err.message);
//     console.log('UNHANDLED REJECTION: SHUTTING DOWN...');
//     server.close(() => {
//         process.exit(1);
//     });
// });




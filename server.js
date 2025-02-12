const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

//console.log(process.env);

dotenv.config({ path: './config.env'})

const DB = process.env.DATABASE_LOCAL;

console.log(DB);

mongoose.connect(DB, {/*no options*/}).then((con) => {
    console.log(con.connections);
    console.log('DB connection successful');
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
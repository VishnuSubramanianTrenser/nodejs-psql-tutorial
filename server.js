// Importing library
const dotenv = require('dotenv');

// Configuration for env variables
dotenv.config({path: './config.env'});

// Importing app.js
const app = require('./app');

// ENV
console.log('ENV = ', process.env.NODE_ENV);

// Server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App start listening on port ${port}...`);
});

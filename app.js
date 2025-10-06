// Importing Libraries
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');

// Importing user router
const userRouter = require('./routers/apiRouter');

// Set-Up Express & its middleware
const app = express();
app.use(express.json());

// Enabling logging using 'morgan'
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// Mount routes
app.use('/api', userRouter);

// Handling not found url requests
app.all(/.*/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;

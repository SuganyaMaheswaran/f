//This will define our express app 

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const authenticate = require('./auth');
const logger = require('./logger');
const { createErrorResponse } = require('./response');

// Question: this logs the https requests?
const pino = require('pino-http')({
    logger, 
})


//Create an express app instance
const app = express(); 

// Attach various middleware functions for all routes

// Use pino logging middleware
app.use(pino);

// Use helmetjs security middleware
app.use(helmet());

// Use CORS middleware so we can make requests across origins 
// Question: what is across origins?
app.use(cors());

// Use gzip/deflate compression middleware
// Question: what does compression() do ?
app.use(compression());

// Set up our passport authentication middleware
passport.use(authenticate.strategy());
app.use(passport.initialize());

// Define our HTTP routes(s)
app.use('/', require('./routes'))



// Add 404 middleware to handle any requests for resources that can't be found can't be found
app.use((req, res) => {
  // Pass along an error object to the error-handling middleware
  res.status(404).json(createErrorResponse(404,'not found'));
});


// Error-handling middleware to deal with anything else 
// eslint-disable-next-line no-unused-vars

app.use((err,req, res, next)=>{
    const status = err.status || 500
    const  message = err.message || 'unable to process request';

    if(status > 499){
        logger.error({err}, `Error processing request`)
    }
    res.status(status).json(createErrorResponse(status, message));
});


// Export our `app` so we can access it in server.js
module.exports = app;
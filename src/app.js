//This will define our express app 

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

//author and version from our package.json file
const {author, version} = require('../package-lock.json');
 
const logger = require('./logger');

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

// Define our HTTP routes(s)

//This will be a simple health check route
app.get('/',( req, res)=>{

    //Clients wouldn't cache this response (always request it fresh)
    // Question: Why don't we have to cache this response?
    res.setHeader('Cache-Control', "no-cache");
    
    // If server is healthy then send 200 'OK' response with info about our repo
    res.status(200).json({
        status: 'ok',
        author, 
        githubUrl:'https://github.com/SuganyaMaheswaran/f',
        version, 
    });
    // Add middleware for dealing with 404s 
    app.use((req,res)=>{
        res.status(404).json({
            status:'error',
            error:{
                message: 'not found',
                code:404
            }
        })
    })
});

// Error-handling middleware to deal with anything else 
// eslint-disable-next-line no-unused-vars 
// ISSUE: This did not work had to add 'rules:{"no-unused-vars":"warn"}' in eslint.config.mjs

app.use((err,req, res, next)=>{
    const status = err.status || 500
    const  message = err.message || 'unable to process request';

    if(status > 499){
        logger.error({err}, `Error processing request`)
    }
    res.status(status).json({
        status: 'error',
        error:{
            message,
            code:status,
        },
    });
});


// Export our `app` so we can access it in server.js
module.exports = app;
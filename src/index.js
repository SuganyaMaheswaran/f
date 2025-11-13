// This will read environment variables from an .env file 
// this will be our app main entry point
// NOTE: we only need to do this once

require('dotenv').config();


// This will log any crash cases so we can debug later from logs

const logger = require('./logger');

// If we are going to crash because of an uncaught exception, log it first. 
// process.on() is listening for events emitted by the Node.js process.
// In this case, it listens for errors that were not caught anywhere in the code.
process.on('uncaughtException', (err, origin)=>{
    logger.fatal({err, origin}, 'uncaughtException');
    throw err;
})


// If we are going to crash because of an unhandled promise rejection, log it first. 
// process.on() is listening for events emitted by the Node.js process.
process.on('unhandledRejection', (reason, promise)=>{
    logger.fatal({reason, promise}, 'unhandledRejection');
    throw reason
})


// Start our server
require('./server')
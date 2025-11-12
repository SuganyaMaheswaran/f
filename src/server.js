
// Stoppable gracefully exits the server (i.e., wait until current connection are finished before shutting down)

const stoppable = require('stoppable');

// Get our logger instance
const logger = require('./logger');

// Get our Express App instance
const app = require('./app');

// Get the desired port from the process' environment. Default to `8080`
// Question: what is the 10 for in this ?
const port = parseInt(process.env.PORT || '8080', 10);

// Start a server listening to this port
const server = stoppable(
    app.listen(port, () =>{
        // Log a message the server has started and which port it's using. 
        logger.info(`Server started on port ${port}`);
    })

);

module.exports= server;
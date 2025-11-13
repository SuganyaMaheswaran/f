// This will entry point for routes 

const express = require('express');
const {authenticate} = require('../auth');

// Version and author from package.json
const {version, author} = require('../../package.json');

// Create a router that we can use to mount our API
const router = express.Router(); 

/** 
 * Expose all our API routes on /v1/* to include an API version.
 */

router.use(`/v1`, authenticate(), require('./api'));

/**
 * Define a simple health check route. If the server is running 
 * we'll respond with a 200 OK. If not, the server isn't healthy.
 */


router.get('/', (req,res)=>{
    // Client's shouldn't cache this response (always a request it fresh);
    res.setHeader('Cache-Control', 'no-cache');
    // Send a 200 'OK' respones
    res.status(200).json({
        status:'ok',
        author,
        githubUrl:'https://github.com/SuganyaMaheswaran/fragments',
        version,
    });
});

module.exports = router;
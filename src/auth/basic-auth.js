// This is Basic Authentication strategy for testing purposes 
// Strategy sets up the auth logic, and authenticate applies it to specific routes.
// Configure HTTP Basic Auth strategy for Passport, see:
// https://github.com/http-auth/http-auth-passport

const auth = require('http-auth');
const passport = require('passport');
const authPassport = require('http-auth-passport');
const logger = require('../logger');

// We expect HTPASSWD_FILE to be defined
if (!process.env.HTPASSWD_FILE){
    throw new Error('missing expected env var: HTPASSWD_FILE');
}

logger.info('Using HTTP Basic Auth for auth');

//a function meant to set up (or register) your HTTP Basic Auth strategy with Passport
module.exports.strategy = ()=>{
    // For our Passport authentication strategy, we'll look for a 
    // username/password pair in the Authroization header. 
    authPassport(
        auth.basic({
            file:process.env.HTPASSWD_FILE,
        })
    )
}
// authenticate – a function that returns the Passport middleware for actually protecting routes:
module.exports.authenticate = ()=> passport.authenticate('http', {session:false})
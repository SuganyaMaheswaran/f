// This will define our Passport strategy and authentication functions

// Configure a JWT token strategy for Passport based on 
// Identity Token provided by Cognito. The token will be 
// parsed from the Authorization header (i.e., Bearer Token).

const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const {CognitoJwtVerifier} = require('aws-jwt-verify');

const logger = require('./logger');

// Create a Cognito JWT Verifier, which will confirm that any JWT we
// get from a user is valid and something we can trust. See:
// https://github.com/awslabs/aws-jwt-verify#cognitojwtverifier-verify-parameters

 if(!(process.env.AWS_COGNITO_CLIENT_ID ||  process.env.AWS_COGNITO_POOL_ID)){
       throw new Error("missing expected env vars: AWS _COGNITO_POOL_ID and AWS_COGNITO_CLIENT_ID");
 }


const JwtVerifier = CognitoJwtVerifier.create({
    // These variables must be set in the .env

    userPoolId: process.env.AWS_COGNITO_POOL_ID,
    clientId: process.env.AWS_COGNITO_CLIENT_ID,
    // We expect an Identity Token (vs. Access Token)
    
    tokenUse: 'id',

});


logger.info('Configured to use AWS Cognito for Authorization');


module.exports.strategy = () =>
    new BearerStrategy(async(token,done)=>{
        try{
            //Verify this JWT
            const user = await JwtVerifier.verify(token);
            logger.debug({user}, 'verified user token');
            done(null, user.email);
        } catch (err){
            logger.error({err,token}, 'could not verify token');
            done(null, false);
        }
    });

module.exports.authenticate = ()=> passport.authenticate('bearer', {session: false});
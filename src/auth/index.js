// This module is defined to determine between basic auth and cogniot

// This is an check to make sure our env file does not have both basic_auth and cogitio variables

if(process.env.AWS_COGNITO_POOL_ID &&
    process.env.AWS_COGNITO_CLIENT_ID &&
    process.env.HTPASSWD_FILE
){
    throw new Error(
       'env contains configuration for both AWS Cognito and HTTP Basic Auth. Only one is allowed.'

    );
}

// Prefer Amazon Cognito (production)
if (process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID){
    module.exports = require('./cognito')
}
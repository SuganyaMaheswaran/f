// a module that will generate success and error response 

/**
 * A successful response looks like:
 * {
 * "status":"ok",
 * }
 */


module.exports.createSuccessResponse = function(data){
    return{
        status:'ok',

    };
};

/**
 * An error response looks like:
 *
 * {
 *   "status": "error",
 *   "error": {
 *     "code": 400,
 *     "message": "invalid request, missing ...",
 *   }
 * }
 */

module.exports.createErrorResponse = function (code, message){
    // TO DO
}
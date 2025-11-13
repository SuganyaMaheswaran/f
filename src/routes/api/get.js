// This will implement our GET /v1/fragments route 

const { Fragment } = require("react/jsx-runtime")

/** 
 * Get a list of fragments for the current user 
 */

module.exports = (req,res)=>{
    res.status(200).json({
        status:'ok',
        Fragment:[],
    });
};
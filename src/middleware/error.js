"use strict";

const ErrorResponse = require('./../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    if(process.env.NODE_ENV === 'Development') {
        console.log(err);
    }

    if(err.name === 'CastError') {
        const message = 'Resource not Found!';
        error = new ErrorResponse(message, 404);
    }

    if(err.code === 11000) {
        const message = 'Duplicate Field value Entered !! Kindly check';
        error = new ErrorResponse(message, 400);
    }

    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors || {}).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }
    
    res.status(error.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        success: false
    });
}

module.exports = errorHandler;
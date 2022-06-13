"use strict";

const ErrorResponse = require("./../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require('./../resources/users/user.model');

const protect = asyncHandler(async (req, res, next) => {
    const token = (req.headers['authorization'] || req.headers['Authorization'] || '').split(' ')[1];

    if(!token) {
        return next(new ErrorResponse('Kindly provide token', 404));
    }

    const decode = jwt.decode(token);

    if(!decode) {
        return next(new ErrorResponse('Invalid Token', 400));
    }

    const user = await User.findById(decode.id).lean().exec();
    req.user = user;
    next();
});

const authorizeRole = (...roles) => (req, res, next) => {
    if(!roles.includes(req.user.role)) {
        return res.status(401).json({
            success: false,
            message: 'No Permission to use this resource!!'
        })
    };

    next();
};

module.exports = {
    protect,
    authorizeRole
};
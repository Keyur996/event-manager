"use strict";

const User = require("./user.model");
const asyncHandler = require('express-async-handler');
const ErrorResponse = require("../../utils/errorResponse");
const jwt = require('jsonwebtoken');

exports.login =  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorResponse('Please provide email & password', 404));
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorResponse('No user Found !!', 404));
    }

    const isMatchPassword = await user.comparePassword(password);

    if(!isMatchPassword) {
        return next(new ErrorResponse('Invalid Password !!', 400));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });

    return res.status(200).json({
        success: true,
        token,
        user
    });
});


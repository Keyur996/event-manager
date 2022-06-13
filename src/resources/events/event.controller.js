"use strict";

const factory = require('./../../utils/handlerfactory');
const Event = require('./event.model');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../../utils/errorResponse');

exports.attchUser = asyncHandler(async (req, res, next) => {
    if(!req.user) {
        return next(new ErrorResponse('Kindly pass token', 404));
    }

    req.body.creator = req.user._id;

    next();
});

exports.attchfilterQuery = (req, res, next) => {
    req.query = req.user.role === 'admin' ? {} : { "users":  { "$in": [ req.user._id ] } };

    next();
}

exports.getEvents = factory.getAll(Event);
exports.createEvent = factory.createOne(Event);
exports.getEvent = factory.getOne(Event);
exports.updateEvent = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
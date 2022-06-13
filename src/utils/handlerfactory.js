"use strict";

const ErrorResponse = require('./errorResponse');
const asyncHandler = require('express-async-handler');

exports.getOne = (Model, popOptions) => asyncHandler(async (req, res, next) => {
    const query = Model.findById(req.params.id);

    if(popOptions) {
        query = query.populate(popOptions);
    }

    const doc = await query;

    if(!doc) {
        return next(new ErrorResponse('No Document Found With this Id', 404));
    }

    return res.status(200).json({
        success: true,
        data: doc
    });
});

exports.createOne = Model => asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);

    return res.status(200).json({
        success: true,
        data: doc
    });
});

exports.deleteOne = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc) {
        return next(new ErrorResponse('No Document Found With this Id', 404));
    }

    return res.status(200).json({
        success: true,
        data: null
    });
});

exports.updateOne = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if(!doc) {
        return next(new ErrorResponse('No Document Found With this Id', 404));
    }

    return res.status(200).json({
        success: true,
        data: doc
    });
});

exports.getAll = Model => asyncHandler(async (req, res, next) => {
    const quertString = req.query || {};
    const docs = await Model.find(quertString);

    return res.status(200).json({
        success: true,
        data: docs
    });
});
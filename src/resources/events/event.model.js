"use strict";

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide event name']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

eventSchema.pre(/^find/, function(next) {
    this.populate('creator')
        .populate('users');

    next();
});

module.exports = mongoose.model('Event', eventSchema);
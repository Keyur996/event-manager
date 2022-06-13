"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide First Name']
    },
    lastname: {
        type: String,
        required: [true, 'Please provide lastname'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate: [ validator.default.isEmail, 'Please provide valid Email' ]
    },
    role: {
        type: String,
        enum: [ 'admin', 'user' ],
        default: 'user'
    },
    phone: {
        type: Number,
        required: [true, 'Please provide phone number'],
        minlength: [10, 'Please enter 10 digit number'],
        maxlength: [10, 'Please enter 10 digit number']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        select: false
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
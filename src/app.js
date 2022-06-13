"use strict";

const express = require("express");
const cors = require("cors");
const hpp = require('hpp');
const xss = require('xss-clean');

const app = express();

app.use(cors());

if(process.env.NODE_ENV === 'Development') {
    app.use(require('morgan')('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(xss());

module.exports = app;

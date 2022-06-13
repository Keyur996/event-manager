"use strict";

const mongoose = require("mongoose");
const dbConenct = async () => {
    try {
        await mongoose.connect(process.env.DB_URI || '');
        console.log("DB connection Succesful !!");
    } catch(err) {
        console.log("DB connection Failed !!", err);
    }
}

module.exports = dbConenct;
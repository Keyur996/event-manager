"use strict";

const userRoutes = require("./users");
const eventRoutes = require("./events");

const setRoutes = (app) => {

    app.use("/api/users", userRoutes);
    app.use("/api/events", eventRoutes);
    // Test Route
    app.get('/hello', (req, res) => {
        res.status(200).json({
            message: 'Hello from Server!!'
        })
    });
}

module.exports = setRoutes;
"use strict";

const app = require('./app');
const dbConnect = require("./utils/dbConnect");
const errorHandler = require("./middleware/error");
const setRoutes = require("./resources");

const start = async () => {
    try {
        const port = process.env.PORT || 3002;
        await dbConnect();
        setRoutes(app);
        const server = app.listen(port, () => {
            console.log(`Server is Running on ${port}`)
        });

        app.use(errorHandler);
    } catch(err) {
        console.log(err);
    }
}

module.exports = start;
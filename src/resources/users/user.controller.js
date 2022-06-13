"use strict";

const factory = require("./../../utils/handlerfactory");
const User = require("./user.model");


exports.getAllUsers = factory.getAll(User);
exports.getOneUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
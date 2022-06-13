"use strict";

const express = require("express");
const userController = require("./user.controller");
const authController = require("./auth.controller");
const { protect, authorizeRole } = require("./../../middleware/auth");

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", userController.createUser);

router.use(protect);

router.route("").get(authorizeRole('admin') ,userController.getAllUsers);

router.route("/:id")
    .get(userController.getOneUser)
    .patch(authorizeRole('admin') ,userController.updateUser)
    .delete(authorizeRole('admin') ,userController.deleteUser);

module.exports = router;

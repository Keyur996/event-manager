"use strict";

const express = require('express');
const eventController = require('./event.controller');
const { protect, authorizeRole } = require('./../../middleware/auth');

const router = express.Router();

router.use(protect, eventController.attchUser);

router.route("")
    .get(eventController.attchfilterQuery ,eventController.getEvents)
    .post(authorizeRole('admin'), eventController.createEvent);

router.route("/:id")
    .get(eventController.getEvent)
    .patch(authorizeRole('admin'), eventController.updateEvent)
    .delete(authorizeRole('admin'), eventController.deleteEvent);

module.exports = router;
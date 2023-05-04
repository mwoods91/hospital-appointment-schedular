const express = require("express");
const router = express.Router();

const { createNewBooking } = require("../controllers/bookings");

router.post("/ws_create_new_booking", createNewBooking);

module.exports = router;

const express = require("express");
const router = express.Router();

const { create_device } = require("../controllers/devices");

router.get("/devices", create_device);

module.exports = router;

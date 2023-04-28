const express = require("express");
const router = express.Router();

const { create_device } = require("../controllers/devices");

router.post("/hospitals", create_device);

module.exports = router;

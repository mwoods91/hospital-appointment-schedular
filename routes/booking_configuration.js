const express = require("express");
const router = express.Router();

const {
  getAllBookingConfiguration,
  getBookingConfigurationByHospital,
  createNewBookingConfiguration,
  updateBookingConfigurationById,
  deleteBookingConfigurationById,
  deleteAllBookingConfiguration,
} = require("../controllers/booking_configuration");

router.get("/ws_get_booking_configuration", getAllBookingConfiguration);
router.get(
  "/ws_get_allowed_dates_by_hospital",
  getBookingConfigurationByHospital
);
router.post(
  "/ws_create_new_booking_configuration",
  createNewBookingConfiguration
);
router.put(
  "/ws_updated_booking_configuration_by_id",
  updateBookingConfigurationById
);
router.delete(
  "/ws_delete_booking_configuration_by_id",
  deleteBookingConfigurationById
);
router.delete(
  "/ws_delete_all_booking_configurations",
  deleteAllBookingConfiguration
);

module.exports = router;

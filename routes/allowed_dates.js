const express = require("express");
const router = express.Router();

const {
  getAllAllowedDates,
  getAllowedDatesByHospital,
  createAllowedDates,
  updateAllowedDatesById,
  deleteAllowedDatesById,
  deleteAllAllowedDates,
} = require("../controllers/allowed_dates");

router.get("/ws_get_allowed_dates", getAllAllowedDates);
router.get("/ws_get_allowed_dates_by_hospital", getAllowedDatesByHospital);
router.post("/ws_create_new_allowed_date", createAllowedDates);
router.put("/ws_updated_allowed_dates_by_id", updateAllowedDatesById);
router.delete("/ws_delete_allowed_dates_by_id", deleteAllowedDatesById);
router.delete("/ws_delete_all_allowed_dates_by_id", deleteAllAllowedDates);

module.exports = router;

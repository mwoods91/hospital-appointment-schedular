const express = require("express");
const router = express.Router();

const {
  getAllCustomeDates,
  getCustomDateByHospital,
  create_new_custom_date,
  update_custom_date_by_id,
  delete_custom_date_by_id,
  delete_all_custom_date_by_id,
} = require("../controllers/allowed_dates");

router.get("/ws_get_allowed_dates", getAllCustomeDates);
router.get("/ws_get_allowed_dates_by_hospital", getCustomDateByHospital);
router.post("/ws_create_new_allowed_date", create_new_custom_date);
router.put("/ws_updated_allowed_dates_by_id", update_custom_date_by_id);
router.delete("/ws_delete_allowed_dates_by_id", delete_custom_date_by_id);
router.delete(
  "/ws_delete_all_allowed_dates_by_id",
  delete_all_custom_date_by_id
);

module.exports = router;

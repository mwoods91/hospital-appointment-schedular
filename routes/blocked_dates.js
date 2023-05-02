const express = require("express");
const router = express.Router();

const {
  getAllBlockedDates,
  getblockedDateByHospital,
  createNewBlockedDate,
  updateBlockedDateById,
  deleteBlockedDateById,
  deleteAllBlockedDateById,
} = require("../controllers/blocked_dates");

router.get("/ws_get_blocked_dates", getAllBlockedDates);
router.get("/ws_get_blocked_dates_by_hospital", getblockedDateByHospital);
router.post("/ws_create_new_blocked_date", createNewBlockedDate);
router.put("/ws_updated_blocked_dates_by_id", updateBlockedDateById);
router.delete("/ws_delete_blocked_dates_by_id", deleteBlockedDateById);
router.delete("/ws_delete_all_blocked_dates_by_id", deleteAllBlockedDateById);

module.exports = router;

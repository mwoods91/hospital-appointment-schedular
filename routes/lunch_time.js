const express = require("express");
const router = express.Router();

const {
  getAllLunchTimes,
  getLunchTimesById,
  createNewLunchTimes,
  updateLunchTimesById,
  deleteLunchTimesById,
  deleteAllLunchTimes,
} = require("../controllers/lunch_times");

router.get("/ws_get_all_lunch_times", getAllLunchTimes);
router.post("/ws_lunch_times_by_id", getLunchTimesById);
router.post("/ws_create_new_lunch_times", createNewLunchTimes);
router.put("/ws_update_lunch_times", updateLunchTimesById);
router.delete("/ws_delete_lunch_times_by_id", deleteLunchTimesById);
router.delete("/ws_delete_all_lunch_times", deleteAllLunchTimes);

module.exports = router;

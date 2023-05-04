const express = require("express");
const router = express.Router();

const {
  getAllBookingSlots,
  getBookingSlotsById,
  createNewBookingSlots,
  updateBookingSlotsById,
  deleteBookingSlotsById,
  deleteAllBookingSlots,
} = require("../controllers/booking_slots");

router.get("/ws_get_all_booking_slots", getAllBookingSlots);
router.post("/ws_booking_slots_by_id", getBookingSlotsById);
router.post("/ws_create_new_booking_slots", createNewBookingSlots);
router.put("/ws_update_booking_slots", updateBookingSlotsById);
router.delete("/ws_delete_booking_slots_by_id", deleteBookingSlotsById);
router.delete("/ws_delete_all_booking_slots", deleteAllBookingSlots);

module.exports = router;

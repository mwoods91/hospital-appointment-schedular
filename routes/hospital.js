const express = require("express");
const router = express.Router();

const {
  getAllHospitals,
  hospital_by_id,
  create_new_hospital,
  update_hospital_by_id,
  delete_hospital_by_id,
  delete_all_hospitals,
} = require("../controllers/hospital");

router.get("/ws_get_all_hospitals", getAllHospitals);
router.get("/ws_hospital_by_id", hospital_by_id);
router.post("/ws_create_new_hospital", create_new_hospital);
router.put("/ws_update_hospital", update_hospital_by_id);
router.delete("/ws_delete_hospital_by_id", delete_hospital_by_id);
router.delete("/ws_delete_all_hospitals", delete_all_hospitals);

module.exports = router;

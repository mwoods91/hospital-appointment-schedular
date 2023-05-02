const express = require("express");
const router = express.Router();

const {
  getAllHospitals,
  getHospitalById,
  createNewHospital,
  updateHospitalById,
  deleteHospitalById,
  deleteAllHospitals,
} = require("../controllers/hospital");

router.get("/ws_get_all_hospitals", getAllHospitals);
router.get("/ws_hospital_by_id", getHospitalById);
router.post("/ws_create_new_hospital", createNewHospital);
router.put("/ws_update_hospital", updateHospitalById);
router.delete("/ws_delete_hospital_by_id", deleteHospitalById);
router.delete("/ws_delete_all_hospitals", deleteAllHospitals);

module.exports = router;

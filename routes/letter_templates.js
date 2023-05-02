const express = require("express");
const router = express.Router();

const {
  getAllLetterTemplates,
  getLetterTemplatesById,
  createNewLetterTemplates,
  updateLetterTemplatesById,
  deleteLetterTemplatesById,
  deleteAllLetterTemplates,
} = require("../controllers/letter_templates");

router.get("/ws_get_all_letter_templates", getAllLetterTemplates);
router.get("/ws_letter_templates_by_id", getLetterTemplatesById);
router.post("/ws_create_new_letter_templates", createNewLetterTemplates);
router.put("/ws_update_letter_templates", updateLetterTemplatesById);
router.delete("/ws_delete_letter_templates_by_id", deleteLetterTemplatesById);
router.delete("/ws_delete_all_letter_templates", deleteAllLetterTemplates);

module.exports = router;

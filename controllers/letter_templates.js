const LetterTemplates = require("../models/letter_templates");

// get all Hospitals from the database
exports.getAllLetterTemplates = async (req, res) => {
  try {
    await LetterTemplates.getAll(res); // Pass in res object to the model function
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// get Hospitals by id from the database
exports.getLetterTemplatesById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Please provide an ID.",
      });
    }

    //fetch hospital by ID
    await Hospital.findById(id, res); // Pass in res object to the model function
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// Create new  hospital in  the database
exports.createNewLetterTemplates = async (req, res) => {
  try {
    const { template_name, body, hospital_id } = req.body;

    // Check if any required field is missing
    if (!code || !name || !address) {
      return res.status(400).json({
        message: "Please provide code, name, and address.",
      });
    }

    //create the new hospital
    await LetterTemplates.create(template_name, body, hospital_id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// update  hospital by id in  the database
exports.updateLetterTemplatesById = async (req, res) => {
  try {
    const { id, template_name, body } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to update",
      });
    }

    //update hospital by id
    await Hospital.updateById(id, template_name, body, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete hospital by ID
exports.deleteLetterTemplatesById = async (req, res) => {
  try {
    const { id } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to delete record",
      });
    }

    //delete the new hospital
    await LetterTemplates.delete(id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete all records from database
exports.deleteAllLetterTemplates = async (req, res) => {
  try {
    //delete all hospitals
    await LetterTemplates.deleteAll(req, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while trying to delete hospitals.",
    });
  }
};

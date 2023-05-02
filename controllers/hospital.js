const Hospital = require("../models/hospital");

// get all Hospitals from the database
exports.getAllHospitals = async (req, res) => {
  try {
    await Hospital.getAll(res); // Pass in res object to the model function
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// get Hospitals by id from the database
exports.hospital_by_id = async (req, res) => {
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
exports.create_new_hospital = async (req, res) => {
  try {
    const { code, name, address } = req.body;

    // Check if any required field is missing
    if (!code || !name || !address) {
      return res.status(400).json({
        message: "Please provide code, name, and address.",
      });
    }

    //create the new hospital
    await Hospital.create(code, name, address, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// update  hospital by id in  the database
exports.update_hospital_by_id = async (req, res) => {
  try {
    const { id, code, name, address } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to update",
      });
    }

    //update hospital by id
    await Hospital.updateById(id, code, name, address, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete hospital by ID
exports.delete_hospital_by_id = async (req, res) => {
  try {
    const { id } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to delete record",
      });
    }

    //delete the new hospital
    await Hospital.delete(id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete all records from database
exports.delete_all_hospitals = async (req, res) => {
  try {
    //delete all hospitals
    await Hospital.deleteAll(req, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while trying to delete hospitals.",
    });
  }
};

const AllowedCustomDates = require("../models/allowed_dates");

// get all custom dates from the database
exports.getAllCustomeDates = async (req, res) => {
  try {
    await AllowedCustomDates.getAll(res); // Pass in res object to the model function
  } catch (err) {
    res.json({
      message: "Some error occurred while retrieving customs dates.",
    });
  }
};

// get all custom dates from the database
exports.getCustomDateByHospital = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Please provide an ID.",
      });
    }

    //fetch hospital by ID
    await AllowedCustomDates.findById(id, res); // Pass in res object to the model function
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// Create new  custom date in  the database
exports.create_new_custom_date = async (req, res) => {
  try {
    const { start_date, end_date, hospital_id } = req.body;

    // Check if any required field is missing
    if (!start_date) {
      return res.status(400).json({
        message: "Please provide start and end date",
      });
    }

    //create the new hospital
    await AllowedCustomDates.create(start_date, end_date, hospital_id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while creating dates." });
  }
};

// update  hospital by id in  the database
exports.update_custom_date_by_id = async (req, res) => {
  try {
    const { id, start_date, end_date, hospital_id } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to update",
      });
    }

    //update hospital by id
    await AllowedCustomDates.updateById(
      id,
      start_date,
      end_date,
      hospital_id,
      res
    );
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete custom date by ID
exports.delete_custom_date_by_id = async (req, res) => {
  try {
    const { id } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to delete record",
      });
    }

    //delete the new hospital
    await AllowedCustomDates.delete(id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete all records from database
exports.delete_all_custom_date_by_id = async (req, res) => {
  try {
    //delete all hospitals
    await AllowedCustomDates.deleteAll(req, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while trying to delete hospitals.",
    });
  }
};

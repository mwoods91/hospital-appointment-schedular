const LunchTime = require("../models/lunch_times");

// get all Hospitals from the database
exports.getAllLunchTimes = async (req, res) => {
  try {
    await LunchTime.getAll(res); // Pass in res object to the model function
  } catch (err) {
    res.json({
      message: "Some error occurred while retrieving lunch_time.",
    });
  }
};

// get Hospitals by id from the database
exports.getLunchTimesById = async (req, res) => {
  try {
    const { hospital_id } = req.body;
    if (!hospital_id) {
      return res.status(400).json({
        message: "Please provide an ID.",
      });
    }

    //fetch hospital by ID
    await LunchTime.findById(hospital_id, res); // Pass in res object to the model function
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving lunch_time." });
  }
};

// Create new  hospital in  the database
exports.createNewLunchTimes = async (req, res) => {
  try {
    const businessHours = req.body;

    // Check if any required field is missing
    if (!businessHours) {
      return res.status(400).json({
        message: "Please provide all values",
      });
    }

    const values = businessHours
      .map(
        ({ hospital_id, days_of_week, start_time, end_time }) =>
          `(${hospital_id}, ${days_of_week}, '${start_time}', '${end_time}')`
      )
      .join(", ");

    //create the new hospital
    await LunchTime.create(values, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while retrieving lunch_time.",
    });
  }
};

// update  hospital by id in  the database
exports.updateLunchTimesById = async (req, res) => {
  try {
    const { id, hospital_id, days_of_week, start_time, end_time } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to update",
      });
    }

    //update hospital by id
    await LunchTime.updateById(
      id,
      hospital_id,
      days_of_week,
      start_time,
      end_time,
      res
    );
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving lunch_time." });
  }
};

//delete hospital by ID
exports.deleteLunchTimesById = async (req, res) => {
  try {
    const { id } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to delete record",
      });
    }

    //delete the new hospital
    await LunchTime.delete(id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving lunch_time." });
  }
};

//delete all records from database
exports.deleteAllLunchTimes = async (req, res) => {
  try {
    //delete all hospitals
    await LunchTime.deleteAll(req, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while trying to delete lunch_time.",
    });
  }
};

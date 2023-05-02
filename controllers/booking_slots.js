const BusinessHours = require("../models/bookings_slots");

// get all Hospitals from the database
exports.getAllBookingSlots = async (req, res) => {
  try {
    await BusinessHours.getAll(res); // Pass in res object to the model function
  } catch (err) {
    res.json({
      message: "Some error occurred while retrieving booking slots.",
    });
  }
};

// get Hospitals by id from the database
exports.getBookingSlotsById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Please provide an ID.",
      });
    }

    //fetch hospital by ID
    await BusinessHours.findById(id, res); // Pass in res object to the model function
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// Create new  hospital in  the database
exports.createNewBookingSlots = async (req, res) => {
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
    await BusinessHours.create(values, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while retrieving booking slots.",
    });
  }
};

// update  hospital by id in  the database
exports.updateBookingSlotsById = async (req, res) => {
  try {
    const { id, hospital_id, days_of_week, start_time, end_time } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to update",
      });
    }

    //update hospital by id
    await BusinessHours.updateById(
      id,
      hospital_id,
      days_of_week,
      start_time,
      end_time,
      res
    );
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete hospital by ID
exports.deleteBookingSlotsById = async (req, res) => {
  try {
    const { id } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to delete record",
      });
    }

    //delete the new hospital
    await BusinessHours.delete(id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete all records from database
exports.deleteAllBookingSlots = async (req, res) => {
  try {
    //delete all hospitals
    await BusinessHours.deleteAll(req, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while trying to delete hospitals.",
    });
  }
};

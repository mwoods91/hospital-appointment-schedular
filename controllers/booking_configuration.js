const BookingConfiguration = require("../models/booking_configuration");

// get all custom dates from the database
exports.getAllBookingConfiguration = async (req, res) => {
  try {
    await BookingConfiguration.getAll(res); // Pass in res object to the model function
  } catch (err) {
    res.json({
      message: "Some error occurred while retrieving customs dates.",
    });
  }
};

// get all custom dates from the database
exports.getBookingConfigurationByHospital = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Please provide an ID.",
      });
    }

    //fetch hospital by ID
    await BookingConfiguration.findById(id, res); // Pass in res object to the model function
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

// Create new  custom date in  the database
exports.createNewBookingConfiguration = async (req, res) => {
  try {
    const isUpdated = 1;
    const {
      hospital_id,
      max_booking_per_slot,
      overbooking_per_day,
      overbooking_per_slot,
      booking_slot_duration,
    } = req.body;

    // Check if any required field is missing
    if (!hospital_id) {
      return res.status(400).json({
        message: "Please provide all values",
      });
    }

    //create the new hospital
    await BookingConfiguration.create(
      hospital_id,
      max_booking_per_slot,
      overbooking_per_day,
      overbooking_per_slot,
      booking_slot_duration,
      isUpdated,
      res
    );
  } catch (err) {
    res.json({ message: "Some error occurred while creating configuration." });
  }
};

// update  hospital by id in  the database
exports.updateBookingConfigurationById = async (req, res) => {
  try {
    const {
      hospital_id,
      max_booking_per_slot,
      overbooking_per_day,
      overbooking_per_slot,
      booking_slot_duration,
    } = req.body;
    // Check if any required field is missing
    if (!hospital_id) {
      return res.status(400).json({
        message: "No hospital ID provided to update",
      });
    }

    //update hospital by id
    await BookingConfiguration.updateById(
      hospital_id,
      max_booking_per_slot,
      overbooking_per_day,
      overbooking_per_slot,
      booking_slot_duration,
      res
    );
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete custom date by ID
exports.deleteBookingConfigurationById = async (req, res) => {
  try {
    const { id } = req.body;
    // Check if any required field is missing
    if (!id) {
      return res.status(400).json({
        message: "No ID provided to delete record",
      });
    }

    //delete the new hospital
    await BookingConfiguration.delete(id, res);
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

//delete all records from database
exports.deleteAllBookingConfiguration = async (req, res) => {
  try {
    //delete all hospitals
    await BookingConfiguration.deleteAll(req, res);
  } catch (err) {
    res.json({
      message: "Some error occurred while trying to delete hospitals.",
    });
  }
};

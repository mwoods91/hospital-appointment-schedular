const Bookings = require("../models/bookings");

// Create new  booking in  the database
exports.createNewBooking = async (req, res) => {
  try {
    const {
      hospital_id,
      end_time,
      title,
      note,
      patient_id,
      letter_template_id,
      booking_start,
    } = req.body;

    // Check if any required field is missing
    if (
      !hospital_id ||
      !booking_start ||
      !end_time ||
      !title ||
      !patient_id ||
      !letter_template_id
    ) {
      return res.status(400).json({
        message: "Please provide values ",
      });
    }

    //create the new hospital
    await Bookings.create(
      hospital_id,
      end_time,
      title,
      note,
      patient_id,
      letter_template_id,
      booking_start,
      res
    );
  } catch (err) {
    res.json({ message: "Some error occurred while retrieving hospitals." });
  }
};

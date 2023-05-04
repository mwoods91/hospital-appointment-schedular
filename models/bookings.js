const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Bookings extends Sequelize.Model {
  constructor(
    hospital_id,
    booking_start,
    end_time,
    title,
    note,
    patient_id,
    letter_template_id
  ) {
    super();
    this.hospital_id = hospital_id;
    this.booking_start = booking_start;
    this.end_time = end_time;
    this.title = title;
    this.note = note;
    this.patient_id = patient_id;
    this.letter_template_id = letter_template_id;
  }
}

Bookings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hospital",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    letter_template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "letter_templates",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    booking_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "bookings",
    timestamps: false,
  }
);

(async () => {
  await Bookings.sync({ alter: true });
  console.log("Bookings model synced");
})();

Bookings.create = async (
  hospital_id,
  end_time,
  title,
  note,
  patient_id,
  letter_template_id,
  booking_start,
  res
) => {
  try {
    //first check the booking configuration in the database
    const [bookingConfig, metadatabookingConfig] = await sequelize.query(
      `SELECT * FROM booking_configuration WHERE hospital_id = ${hospital_id}`
    );

    //Store the configuration in variables
    const max_booking_per_slot = bookingConfig[0].max_booking_per_slot; //this returns 2
    const overBookingPerDay = bookingConfig[0].overbooking_per_day; //this returns 6
    const overbookingPerSlot = bookingConfig[0].overbooking_per_slot; //this returns 2

    //Gets the number of overbookings used per day
    const [bookings, metadatabookings] = await sequelize.query(
      `SELECT COUNT(*) as overbooking_slots FROM (SELECT booking_start, COUNT(*) as num_bookings FROM bookings WHERE hospital_id = ${hospital_id} AND DATE(booking_start) = '2023-05-15' GROUP BY booking_start HAVING num_bookings >${overbookingPerSlot} )  as overbooking_slots`
    );

    //store variables
    const OverbookingsUsedToday = bookings[0].overbooking_slots;

    // counts the number of bookings used per slot
    const [numBookingsPerSlot, metadatabookingsCountPerTime] =
      await sequelize.query(
        `SELECT COUNT(*) as count FROM bookings WHERE hospital_id = ${hospital_id} AND booking_start = '${booking_start}'`
      );

    //store variables
    const BookingsPerSlot = numBookingsPerSlot[0].count;

    //this gets the full day of the start_date
    // let booking_start_convert = "2023-05-15 09:30:00";
    // let dateOnly = booking_start_convert.split(" ")[0]; // Split the string and take the first part as date
    // booking_start_convert = dateOnly;

    //if overbooking is value then check overbooking per slot

    console.log("Bookings made per chosen timeslot", BookingsPerSlot);
    console.log("Overbookings made today", OverbookingsUsedToday);
    console.log("max Booking allowed per slot", max_booking_per_slot);
    console.log("Overbookings Allowed Per day", overBookingPerDay);
    console.log("OverBookings allowed Per slot", overbookingPerSlot);

    if (BookingsPerSlot < max_booking_per_slot) {
      // booking is allowed
      const [results, metadata] = await sequelize.query(
        `INSERT INTO bookings (hospital_id, end_time, title, note, patient_id, letter_template_id, booking_start) 
        VALUES ('${hospital_id}', '${end_time}', '${title}', '${note}', '${patient_id}', '${letter_template_id}', '${booking_start}')`
      );
      res.json({
        message: "booking allowed",
        results,
        OverbookingsUsedToday,
        BookingsPerSlot,
        overbookingPerSlot,
      });
    } else if (
      (overBookingPerDay > 0 && OverbookingsUsedToday < overBookingPerDay) ||
      OverbookingsUsedToday === overBookingPerDay
    ) {
      // overbooking is allowed for the day
      if (
        overbookingPerSlot > 0 &&
        BookingsPerSlot < max_booking_per_slot + overbookingPerSlot
      ) {
        // overbooking is allowed for the slot
        const [results, metadata] = await sequelize.query(
          `INSERT INTO bookings (hospital_id, end_time, title, note, patient_id, letter_template_id, booking_start) 
          VALUES ('${hospital_id}', '${end_time}', '${title}', '${note}', '${patient_id}', '${letter_template_id}', '${booking_start}')`
        );
        res.json({
          message: "booking allowed (with overbooking)",
          results,

          OverbookingsUsedToday,
          overbookingPerSlot,
        });
      } else {
        // overbooking is not allowed for the slot
        res.json({
          message: "booking not allowed (exceeds overbookings per slot limit)",
          OverbookingsUsedToday,
        });
      }
    } else {
      // booking is not allowed
      res.json({
        message: "booking not allowed (exceeds booking limit)",
        OverbookingsUsedToday,

        overbookingPerSlot,
      });
    }
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ message: "Internal server Error" });
    }
  }
};

module.exports = Bookings;

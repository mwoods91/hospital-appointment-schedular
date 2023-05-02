const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class BookingConfiguration extends Sequelize.Model {
  constructor(
    hospital_id,
    max_booking_per_slot,
    overbooking_per_day,
    overbooking_per_slot,
    isUpdated
  ) {
    super();
    this.hospital_id = hospital_id;
    this.max_booking_per_slot = max_booking_per_slot;
    this.overbooking_per_day = overbooking_per_day;
    this.overbooking_per_slot = overbooking_per_slot;
    this.booking_slot_duration = booking_slot_duration;
    this.isUpdated = isUpdated;
  }
}

BookingConfiguration.init(
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
    max_booking_per_slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    overbooking_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    overbooking_per_slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    booking_slot_duration: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: 0,
    },
    isUpdated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "booking_configuration",
    timestamps: false,
  }
);

(async () => {
  await BookingConfiguration.sync({ alter: true });
  console.log("BookingConfiguration model synced");
})();

//get all booking configurations
BookingConfiguration.getAll = async (res) => {
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM booking_configuration"
    );
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

BookingConfiguration.findById = async (id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM booking_configuration WHERE hospital_id = '${id}'`
    );
    if (results.length === 0) {
      return res.status(404).json({ message: "No Results found" });
    }
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

BookingConfiguration.create = async (
  hospital_id,
  max_booking_per_slot,
  overbooking_per_day,
  overbooking_per_slot,
  booking_slot_duration,
  isUpdated,
  res
) => {
  try {
    const [existingResults, metadata] = await sequelize.query(
      `SELECT * FROM booking_configuration WHERE hospital_id = '${hospital_id}'`
    );

    if (existingResults.length > 0) {
      return res.status(400).json({
        message: `Hospital with ID ${hospital_id} already exists`,
      });
    }

    const [results, metadata2] = await sequelize.query(
      `INSERT INTO booking_configuration (hospital_id, max_booking_per_slot, overbooking_per_day, overbooking_per_slot, booking_slot_duration,isUpdated ) VALUES ('${hospital_id}',${max_booking_per_slot}, '${overbooking_per_day}', '${overbooking_per_slot}', '${booking_slot_duration}', '${isUpdated}')`
    );

    if (res && results) {
      res.status(200).json({
        message: "booking_configuration updated successfully",
        data: {
          hospital_id,
          max_booking_per_slot,
          overbooking_per_day,
          overbooking_per_slot,
          booking_slot_duration,
          isUpdated,
        },
      });
    }
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({
        message: "Internal server Error",
      });
    }
  }
};

BookingConfiguration.updateById = async (
  hospital_id,
  max_booking_per_slot,
  overbooking_per_day,
  overbooking_per_slot,
  booking_slot_duration,
  res
) => {
  try {
    const isUpdated = 1;
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM booking_configuration WHERE hospital_id = ${hospital_id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `booking_configuration with id ${hospital_id} not found`,
      });
    }
    await sequelize.query(
      `UPDATE booking_configuration SET hospital_id = '${hospital_id}', max_booking_per_slot = ${max_booking_per_slot}, overbooking_per_day = '${overbooking_per_day}', overbooking_per_slot = '${overbooking_per_slot}', booking_slot_duration= '${booking_slot_duration}', isUpdated = '${isUpdated}'`
    );
    res.status(200).json({
      message: "booking_configuration updated successfully",
      data: {
        hospital_id,
        max_booking_per_slot,
        overbooking_per_day,
        overbooking_per_slot,
        booking_slot_duration,
        isUpdated,
      },
    });
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ message: "Internal server Error" });
    }
  }
};

BookingConfiguration.delete = async (id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM booking_configuration WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `booking_configuration with id ${id} not found`,
      });
    }
    // Delete hospital
    await sequelize.query(`DELETE FROM booking_configuration WHERE id = ${id}`);
    res.json({ message: `booking_configuration ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

BookingConfiguration.deleteAll = async (req, res) => {
  try {
    // Delete all records
    const [results, metadata] = await sequelize.query(
      "DELETE FROM booking_configuration"
    );
    res.json({
      message: "All booking_configuration deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = BookingConfiguration;

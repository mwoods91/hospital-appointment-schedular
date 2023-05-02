const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class BusinessHours extends Sequelize.Model {
  constructor(hospital_id, days_of_week, start_time, end_time) {
    super();
    this.hospital_id = hospital_id;
    this.days_of_week = days_of_week;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

BusinessHours.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    days_of_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: "booking_slots",
    timestamps: false,
  }
);

(async () => {
  await BusinessHours.sync({ alter: true });
  console.log("timeSlot model synced");
})();

//get all allowed custom dates
BusinessHours.getAll = async (res) => {
  // Pass in res object as a parameter
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM booking_slots"
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

BusinessHours.findById = async (id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM booking_slots WHERE hospital_id = '${id}'`
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

BusinessHours.create = async (values, res) => {
  try {
    const [results, metadata] = await sequelize.query(`
      INSERT INTO booking_slots (hospital_id, days_of_week, start_time, end_time)
      VALUES ${values}
    `);
    if (res && results) {
      // check if both res and results are defined
      res.status(201).json({
        message: "Custom date created successfully",
        data: {
          values,
        },
      });
    }
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ message: "Internal server Error" });
    }
  }
};

BusinessHours.updateById = async (
  id,
  hospital_id,
  days_of_week,
  start_time,
  end_time,
  res
) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM booking_slots WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `booking_slots with id ${id} not found`,
      });
    }
    await sequelize.query(
      `UPDATE booking_slots SET hospital_id= '${hospital_id}', days_of_week = '${days_of_week}', start_time = '${start_time}', end_time = '${end_time}'  WHERE id = ${id}`
    );
    res.status(200).json({
      message: "booking_slots updated successfully",
      data: {
        id,
        hospital_id,
        days_of_week,
        start_time,
        end_time,
      },
    });
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ message: "Internal server Error" });
    }
  }
};

BusinessHours.delete = async (id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM booking_slots WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `booking_slots with id ${id} not found`,
      });
    }
    // Delete hospital
    await sequelize.query(`DELETE FROM allow_custom_dates WHERE id = ${id}`);
    res.json({ message: `booking_slots ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

BusinessHours.deleteAll = async (req, res) => {
  try {
    // Delete all records
    const [results, metadata] = await sequelize.query(
      "DELETE FROM booking_slots"
    );
    res.json({
      message: "All booking_slots deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = BusinessHours;

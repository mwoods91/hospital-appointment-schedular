const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class LunchTime extends Sequelize.Model {
  constructor(hospital_id, days_of_week, start_time, end_time) {
    super();
    this.hospital_id = hospital_id;
    this.days_of_week = days_of_week;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

LunchTime.init(
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
    tableName: "lunch_time",
    timestamps: false,
  }
);

(async () => {
  await LunchTime.sync({ alter: true });
  console.log("LunchTime model synced");
})();

//get all allowed custom dates
LunchTime.getAll = async (res) => {
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

LunchTime.findById = async (hospital_id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM lunch_time WHERE hospital_id = '${hospital_id}'`
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "No Results found" });
    }
    // format the query results as an array of objects
    const businessHours = results.map((row) => ({
      days_of_week: [row.days_of_week], // convert the single day of the week to an array
      start_time: row.start_time,
      end_time: row.end_time,
    }));
    res.json(businessHours);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

LunchTime.create = async (values, res) => {
  try {
    const [results, metadata] = await sequelize.query(`
      INSERT INTO lunch_time (hospital_id, days_of_week, start_time, end_time)
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

LunchTime.updateById = async (
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
      `SELECT * FROM lunch_time WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `lunch_time with id ${id} not found`,
      });
    }
    await sequelize.query(
      `UPDATE lunch_time SET hospital_id= '${hospital_id}', days_of_week = '${days_of_week}', start_time = '${start_time}', end_time = '${end_time}'  WHERE id = '${id}'`
    );
    res.status(200).json({
      message: "lunch_time updated successfully",
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

LunchTime.delete = async (id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM lunch_time WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `lunch_time with id ${id} not found`,
      });
    }
    // Delete hospital
    await sequelize.query(`DELETE FROM lunch_time WHERE id = ${id}`);
    res.json({ message: `lunch_time ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

LunchTime.deleteAll = async (req, res) => {
  try {
    // Delete all records
    const [results, metadata] = await sequelize.query("DELETE FROM lunch_time");
    res.json({
      message: "All lunch_time deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = LunchTime;

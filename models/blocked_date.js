const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class BlockedDates extends Sequelize.Model {
  constructor(hospital_id, start_time, end_time) {
    super();
    this.hospital_id = hospital_id;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

BlockedDates.init(
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
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "blocked_dates",
    timestamps: false,
  }
);

(async () => {
  await BlockedDates.sync({ alter: true });
  console.log("BlockedDates model synced");
})();

//get all allowed custom dates
BlockedDates.getAll = async (res) => {
  // Pass in res object as a parameter
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM blocked_dates"
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

BlockedDates.findById = async (id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM blocked_dates WHERE hospital_id = '${id}'`
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

BlockedDates.create = async (start_date, end_date, hospital_id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `INSERT INTO blocked_dates (hospital_id, start_time, end_time) VALUES ('${hospital_id}','${start_date}', '${end_date}')`
    );
    if (res && results) {
      // check if both res and results are defined
      res.status(201).json({
        message: "Custom date created successfully",
        data: {
          start_date,
          end_date,
          hospital_id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ message: "Internal server Error", sqlMessage });
    }
  }
};

BlockedDates.updateById = async (
  id,
  start_date,
  end_date,
  hospital_id,
  res
) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM blocked_dates WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `custom date with id ${id} not found`,
      });
    }
    await sequelize.query(
      `UPDATE blocked_dates SET hospital_id = '${hospital_id}' , start_time = '${start_date}', end_time = '${end_date}' WHERE id = ${id}`
    );
    res.status(200).json({
      message: "custom date updated successfully",
      data: {
        id,
        start_date,
        end_date,
        hospital_id,
      },
    });
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ message: "Internal server Error" });
    }
  }
};

BlockedDates.delete = async (id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM blocked_dates WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `blocked_dates with id ${id} not found`,
      });
    }
    // Delete hospital
    await sequelize.query(`DELETE FROM blocked_dates WHERE id = ${id}`);
    res.json({ message: `blocked_dates ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

BlockedDates.deleteAll = async (req, res) => {
  try {
    // Delete all records
    const [results, metadata] = await sequelize.query(
      "DELETE FROM allow_custom_dates"
    );
    res.json({
      message: "All allow_custom_dates deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = BlockedDates;

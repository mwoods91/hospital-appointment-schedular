const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class AllowedCustomDates extends Sequelize.Model {
  constructor(hospital_id, start_time, end_time) {
    super();
    this.hospital_id = hospital_id;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

AllowedCustomDates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
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
    tableName: "allow_custom_dates",
    timestamps: false,
  }
);

(async () => {
  await AllowedCustomDates.sync({ alter: true });
  console.log("Allowed Dates model synced");
})();

//get all allowed custom dates
AllowedCustomDates.getAll = async (res) => {
  // Pass in res object as a parameter
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM allow_custom_dates"
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

AllowedCustomDates.findById = async (id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM allow_custom_dates WHERE hospital_id = '${id}'`
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

AllowedCustomDates.create = async (start_date, end_date, hospital_id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `INSERT INTO allow_custom_dates (start_date, end_date, hospital_id) VALUES (${start_date}, '${end_date}', '${hospital_id}')`
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
      res.status(500).json({ message: "Internal server Error" });
    }
  }
};

AllowedCustomDates.updateById = async (
  id,
  start_date,
  end_date,
  hospital_id,
  res
) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM allow_custom_dates WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `custom date with id ${id} not found`,
      });
    }
    await sequelize.query(
      `UPDATE allow_custom_dates SET start_date= '${start_date}', end_date = '${end_date}', hospital_id = '${hospital_id}' WHERE id = ${id}`
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

AllowedCustomDates.delete = async (id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM allow_custom_dates WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `allow_custom_dates with id ${id} not found`,
      });
    }
    // Delete hospital
    await sequelize.query(`DELETE FROM allow_custom_dates WHERE id = ${id}`);
    res.json({ message: `allow_custom_dates ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

AllowedCustomDates.deleteAll = async (req, res) => {
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

module.exports = AllowedCustomDates;

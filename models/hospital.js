const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Hospital extends Sequelize.Model {
  constructor(code, name, address) {
    super();
    this.code = code;
    this.name = name;
    this.address = address;
  }
}

Hospital.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "hospital",
    timestamps: false,
  }
);

(async () => {
  await Hospital.sync();
  console.log("Hospital model synced");
})();

Hospital.getAll = async (res) => {
  // Pass in res object as a parameter
  try {
    const [results, metadata] = await sequelize.query("SELECT * FROM hospital");
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

Hospital.findById = async (id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM hospital WHERE id = '${id}'`
    );
    if (results.length === 0) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

Hospital.create = async (code, name, address, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `INSERT INTO hospital (code, name, address) VALUES (${code}, '${name}', '${address}')`
    );
    if (res && results) {
      // check if both res and results are defined
      res.status(201).json({
        message: "Hospital created successfully",
        data: {
          code,
          name,
          address,
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

Hospital.updateById = async (id, code, name, address, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM hospital WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `Hospital with id ${id} not found`,
      });
    }
    await sequelize.query(
      `UPDATE hospital SET code = '${code}', name = '${name}', address = '${address}' WHERE id = ${id}`
    );
    res.status(200).json({
      message: "Hospital updated successfully",
      data: {
        code,
        name,
        address,
      },
    });
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ message: "Internal server Error" });
    }
  }
};

Hospital.delete = async (id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM hospital WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `Hospital with id ${id} not found`,
      });
    }
    // Delete hospital
    await sequelize.query(`DELETE FROM hospital WHERE id = ${id}`);
    res.json({ message: `Hospital ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

Hospital.deleteAll = async (req, res) => {
  try {
    // Delete all records
    const [results, metadata] = await sequelize.query("DELETE FROM hospital");
    res.json({
      message: "All hospitals deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = Hospital;

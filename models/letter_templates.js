const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class LetterTemplates extends Sequelize.Model {
  constructor(template_name, body, hospital_id) {
    super();

    this.template_name = template_name;
    this.body = body;
    this.hospital_id = hospital_id;
  }
}

LetterTemplates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    template_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
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
    tableName: "letter_templates",
    timestamps: false,
  }
);

(async () => {
  await LetterTemplates.sync({ alter: true });
  console.log(" LetterTemplates model synced");
})();

//get all allowed custom dates
LetterTemplates.getAll = async (res) => {
  // Pass in res object as a parameter
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM letter_templates"
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

LetterTemplates.findById = async (id, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM letter_templates WHERE hospital_id = '${id}'`
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

LetterTemplates.create = async (
  template_name,
  body,
  hospital_id,

  res
) => {
  try {
    const [existingResults, metadata] = await sequelize.query(
      `SELECT * FROM letter_templates WHERE hospital_id = '${hospital_id}'`
    );

    if (existingResults.length > 0) {
      return res.status(400).json({
        message: `Letter with ID ${hospital_id} already exists`,
      });
    }

    const [results, metadata2] = await sequelize.query(
      `INSERT INTO letter_templates (template_name, body, hospital_id ) VALUES ('${template_name}',${body}, '${hospital_id}')`
    );

    if (res && results) {
      res.status(200).json({
        message: "letter template updated successfully",
        data: {
          template_name,
          body,
          hospital_id,
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

LetterTemplates.updateById = async (template_name, body, hospital_id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM letter_templates WHERE hospital_id = ${hospital_id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `letter_templates with id ${hospital_id} not found`,
      });
    }
    await sequelize.query(
      `UPDATE letter_templates SET template_name = '${template_name}', body = ${body}, hospital_id = '${hospital_id}'`
    );
    res.status(200).json({
      message: "letter_templates updated successfully",
      data: {
        template_name,
        body,
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

LetterTemplates.delete = async (id, res) => {
  try {
    // Check if the hospital exists with the id
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM letter_templates WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: `letter_templates with id ${id} not found`,
      });
    }
    // Delete hospital
    await sequelize.query(`DELETE FROM letter_templates WHERE id = ${id}`);
    res.json({ message: `letter_templates ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

LetterTemplates.deleteAll = async (req, res) => {
  try {
    // Delete all records
    const [results, metadata] = await sequelize.query(
      "DELETE FROM letter_templates"
    );
    res.json({
      message: "All letter_templates deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = LetterTemplates;

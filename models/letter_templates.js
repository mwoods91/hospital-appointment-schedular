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
      type: DataTypes.TIME,
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

module.exports = LetterTemplates;

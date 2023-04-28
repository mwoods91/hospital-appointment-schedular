const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Patient extends Sequelize.Model {
  constructor(hospital_id, name, title, notes) {
    super();
    this.hospital_id = hospital_id;
    this.name = name;
    this.title = title;
    this.notes = notes;
  }
}

Patient.init(
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "patients",
    timestamps: false,
  }
);

(async () => {
  await Patient.sync({ alter: true });
  console.log("Patient model synced");
})();

module.exports = Patient;

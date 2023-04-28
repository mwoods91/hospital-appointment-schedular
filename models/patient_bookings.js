const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class PatientBookings extends Sequelize.Model {
  constructor(patient_id, booking_id) {
    super();
    this.patient_id = patient_id;
    this.booking_id = booking_id;
  }
}

PatientBookings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bookings",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "patient_bookings",
    timestamps: false,
  }
);

(async () => {
  await PatientBookings.sync({ alter: true });
  console.log("PatientBookings model synced");
})();

module.exports = PatientBookings;

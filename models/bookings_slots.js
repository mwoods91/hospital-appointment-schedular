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

module.exports = BusinessHours;

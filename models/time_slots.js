const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class TimeSlot extends Sequelize.Model {
  constructor(
    hospital_id,
    start_time,
    end_time,
    max_bookings,
    current_bookings
  ) {
    super();
    this.hospital_id = hospital_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.max_bookings = max_bookings;
    this.current_bookings = current_bookings;
  }
}

TimeSlot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    max_bookings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    max_overbookings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "time_slots",
    timestamps: false,
  }
);

(async () => {
  await TimeSlot.sync({ alter: true });
  console.log("timeSlot model synced");
})();

module.exports = TimeSlot;

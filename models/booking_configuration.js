const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class BookingConfiguration extends Sequelize.Model {
  constructor(hospital_id, days_of_week, start_time, end_time) {
    super();
    this.hospital_id = hospital_id;
    this.max_booking_per_slot = max_booking_per_slot;
    this.overbooking_per_day = overbooking_per_day;
    this.overbooking_per_slot = overbooking_per_slot;
    this.booking_slot_duration = booking_slot_duration;
    this.isUpdated = isUpdated;
  }
}

BookingConfiguration.init(
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
    max_booking_per_slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    overbooking_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    overbooking_per_slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    booking_slot_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isUpdated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "booking_configuration",
    timestamps: false,
  }
);

(async () => {
  await BookingConfiguration.sync({ alter: true });
  console.log("BookingConfiguration model synced");
})();

module.exports = BookingConfiguration;

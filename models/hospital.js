const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Hospital extends Sequelize.Model {
  constructor(
    code,
    name,
    custom_time_slots,
    max_bookings_per_slot,
    override_overbooking,
    max_overbookings_per_day
  ) {
    super();
    this.code = code;
    this.name = name;
    this.custom_time_slots = custom_time_slots;
    this.max_bookings_per_slot = max_bookings_per_slot;
    this.override_overbooking = override_overbooking;
    this.max_overbookings_per_day = max_overbookings_per_day;
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
    custom_time_slots: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    max_bookings_per_slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    override_overbooking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    max_overbookings_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "hospital",
    timestamps: false,
  }
);

(async () => {
  await Hospital.sync({ alter: true });
  console.log("Hospital model synced");
})();

module.exports = Hospital;

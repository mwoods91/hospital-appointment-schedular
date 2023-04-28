const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Bookings extends Sequelize.Model {
  constructor(hospital_id, time_slot_id, start_time, end_time) {
    super();
    this.hospital_id = hospital_id;
    this.time_slot_id = time_slot_id;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

Bookings.init(
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
    time_slot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "time_slots",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "bookings",
    timestamps: false,
  }
);

(async () => {
  await Bookings.sync({ alter: true });
  console.log("Bookings model synced");
})();

module.exports = Bookings;

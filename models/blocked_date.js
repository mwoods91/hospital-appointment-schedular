const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class BlockedDates extends Sequelize.Model {
  constructor(hospital_id, start_time, end_time) {
    super();
    this.hospital_id = hospital_id;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

BlockedDates.init(
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
    tableName: "blocked_times",
    timestamps: false,
  }
);

(async () => {
  await BlockedDates.sync({ alter: true });
  console.log("BlockedDates model synced");
})();

module.exports = BlockedDates;

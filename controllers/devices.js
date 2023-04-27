const Device = require("../models/devices");

exports.create_device = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "No data received",
    });
  }

  // Create a device
  const device = new Device({
    name: req.body.name,
    os: req.body.os,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    mac_address: req.mac_address,
  });

  // Save Tutorial in the database
  Device.create(device, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Device.",
      });
    else res.send(data);
  });
};

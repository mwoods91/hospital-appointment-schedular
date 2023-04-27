const sql = require("../database/index");

// constructor
const Wifi = function (wifi) {
  this.id = wifi;
  this.device_id = wifi.device_id;
  this.location = wifi.location;
  this.ssid = wifi.ssid;
  this.bssid = wifi.bssid;
  this.signal_strength = wifi.signal_strength;
  this.signal_quality = wifi.signal_quality;
  this.noise_level = wifi.noise_level;
  this.channel = wifi.channel;
  this.timestamp = wifi.timestamp;
};

// Export models
module.exports = Wifi;

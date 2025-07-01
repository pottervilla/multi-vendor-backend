const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String
});

module.exports = mongoose.model('Vendor', VendorSchema);

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  dimensions: String,
  stock: Number,
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }
});

module.exports = mongoose.model('Product', ProductSchema);

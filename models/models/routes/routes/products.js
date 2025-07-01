const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, description, price, dimensions, stock, vendorId } = req.body;
    const product = new Product({ name, description, price, dimensions, stock, vendorId });
    await product.save();
    res.send({ message: 'Product added' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

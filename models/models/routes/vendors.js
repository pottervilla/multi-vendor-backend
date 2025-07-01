const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await Vendor.findOne({ email });
    if (exists) return res.status(400).send({ error: 'Already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const vendor = new Vendor({ name, email, password: hashed });
    await vendor.save();
    res.send({ message: 'Registered' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ email: req.body.email });
    if (!vendor) return res.status(404).send('Not found');

    const match = await bcrypt.compare(req.body.password, vendor.password);
    if (!match) return res.status(401).send('Wrong password');

    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

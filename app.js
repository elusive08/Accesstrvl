import profileRoutes from "./routes/profile.routes.js";

app.use("/profile", profileRoutes);

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/accessibilityDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' DB Connection Error:', err));
const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: {
    city: String,
    zipCode: String,
    address: String
  },
  accessibility: {
    wheelchair: { type: Boolean, default: false },
    visual: { type: Boolean, default: false },
    hearing: { type: Boolean, default: false },
    serviceAnimals: { type: Boolean, default: false }
  }
});
const Place = mongoose.model('Place', PlaceSchema);
app.get('/places/search', async (req, res) => {
  try {
    const { wheelchair, visual, hearing, serviceAnimals, city, zip } = req.query;
    let mongoQuery = {};
    if (wheelchair === 'true') mongoQuery['accessibility.wheelchair'] = true;
    if (visual === 'true') mongoQuery['accessibility.visual'] = true;
    if (hearing === 'true') mongoQuery['accessibility.hearing'] = true;
    if (serviceAnimals === 'true') mongoQuery['accessibility.serviceAnimals'] = true;
    if (city) {
      mongoQuery['location.city'] = { $regex: new RegExp(city, 'i') };
    }
    if (zip) {
      mongoQuery['location.zipCode'] = zip;
    }
    const results = await Place.find(mongoQuery);
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search Engine Error",
      error: error.message
    });
  }
});
app.post('/places', async (req, res) => {
  const newPlace = await Place.create(req.body);
  res.status(201).json(newPlace);
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Dev 6 Search Engine running at http://localhost:${PORT}`);

});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const MONGO_URI = 'mongodb://localhost:27017/accessibilityDB';
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const db = mongoose.connection;
    await db.collection('places').createIndex({ 
      "location.city": 1, 
      "accessibility.wheelchair": 1, 
      "accessibility.visual": 1 
    });
    console.log('Compound Indexes Optimized');
  })
  .catch(err => console.error('Connection Error:', err));
const PlaceSchema = new mongoose.Schema({
  name: String,
  location: { city: String, zipCode: String },
  accessibility: {
    wheelchair: { type: Boolean, default: false },
    visual: { type: Boolean, default: false },
    hearing: { type: Boolean, default: false },
    serviceAnimals: { type: Boolean, default: false }
  }
});
const Place = mongoose.model('Place', PlaceSchema);
app.post('/places/match', async (req, res) => {
  try {
    const { userProfile, preferences } = req.body;
    let compoundQuery = {};
    if (userProfile) {
      if (userProfile.needsWheelchair) compoundQuery['accessibility.wheelchair'] = true;
      if (userProfile.needsVisual) compoundQuery['accessibility.visual'] = true;
      if (userProfile.needsHearing) compoundQuery['accessibility.hearing'] = true;
      if (userProfile.hasServiceAnimal) compoundQuery['accessibility.serviceAnimals'] = true;
    }
    if (preferences && preferences.city) {
      compoundQuery['location.city'] = { $regex: new RegExp(preferences.city, 'i') };
    }
    const results = await Place.find(compoundQuery).lean();
    res.status(200).json({
      matchCount: results.length,
      criteriaUsed: compoundQuery,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.post('/places/seed', async (req, res) => {
  const sampleData = [
    {
      name: "Accessible Cafe",
      location: { city: "Austin", zipCode: "78701" },
      accessibility: { wheelchair: true, visual: true, hearing: false, serviceAnimals: true }
    },
    {
      name: "Standard Park",
      location: { city: "Austin", zipCode: "78702" },
      accessibility: { wheelchair: true, visual: false, hearing: false, serviceAnimals: false }
    }
  ];
  await Place.insertMany(sampleData);
  res.send("Seed data added!");
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Dev 6 Week 2 Engine on port ${PORT}`));
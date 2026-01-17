import "dotenv/config";
import express from "express";

// REGISTER MODELS FIRST
import "./modules/media/media.model.js";
import "./modules/place/place.model.js";
import "./modules/trip/trip.model.js";

import loaders from "./loaders/index.js";

const app = express();
app.use(express.json());

await loaders(app);

export default app;

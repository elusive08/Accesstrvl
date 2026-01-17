import "dotenv/config";
import express from "express";
import loaders from "./loaders/index.js";

// ✅ Register ONLY Week 2 models
import "./modules/place/place.model.js";
import "./modules/media/media.model.js";

const app = express();

app.use(express.json());

await loaders(app);

export default app;

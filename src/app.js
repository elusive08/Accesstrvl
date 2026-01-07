import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongooseLoader from "./loaders/mongooseLoader.js";
import placeRoutes from "./modules/place/index.js";

const app = express();

await mongooseLoader();

app.use(express.json());

app.use("/api/places", placeRoutes);

export default app;

import express from "express";
import placeRoutes from "./routes/place.routes.js";

const app = express();

app.use(express.json());

app.use("/api", placeRoutes);

export default app;
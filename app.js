import "dotenv/config";
import express from "express";
import loaders from "./loaders/index.js";

// ✅ Register ONLY Media model (Week 1 responsibility)
import "./modules/media/media.model.js";

const app = express();

app.use(express.json());

await loaders(app);

export default app;

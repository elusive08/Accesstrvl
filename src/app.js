// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import "./config/cloudinary.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);

export default app;

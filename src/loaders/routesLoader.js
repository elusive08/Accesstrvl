import placeRoutes from "../modules/places/index.js";

export default (app) => {
  app.use("/api/places", placeRoutes);

  app.get("/", (req, res) => {
    res.json({ message: "API running" });
  });
};

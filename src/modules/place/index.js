import placeRoutes from "./place.routes.js";

export default function placeModule(app) {
  app.use("/api/places", placeRoutes);
}

import tripRoutes from "./trip.routes.js";

export default function tripModule(app) {
  app.use("/api/trips", tripRoutes);
}

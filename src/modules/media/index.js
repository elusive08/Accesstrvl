import mediaRoutes from "./media.routes.js";

export default function mediaModule(app) {
  app.use("/api/media", mediaRoutes);
}

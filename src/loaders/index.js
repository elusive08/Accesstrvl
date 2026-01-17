import "../modules/media/media.model.js"; // ✅ Registers Media model with Mongoose
import mongooseLoader from "./mongooseLoader.js";
import routesLoader from "./routesLoader.js";

export default async function loaders(app) {
  await mongooseLoader();
  routesLoader(app);
}

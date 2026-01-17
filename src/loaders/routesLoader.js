import mediaModule from "../modules/media/index.js";

export default function routesLoader(app) {
  console.log("✅ Media routes loading");
  mediaModule(app);
}

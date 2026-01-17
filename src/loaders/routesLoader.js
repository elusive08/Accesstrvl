import mediaModule from "../modules/media/index.js";
import placeModule from "../modules/place/index.js";
import tripModule from "../modules/trip/index.js";

export default function routesLoader(app) {
  mediaModule(app);
  placeModule(app);
  tripModule(app);
}

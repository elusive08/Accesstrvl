import mongooseLoader from "./mongooseLoader.js";
import { configureCloudinary } from "../config/cloudinary.js";

export default async function loaders() {
  await mongooseLoader();     // DB first
  configureCloudinary();      // External service second
}

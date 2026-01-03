// server.js
import app from "./src/app.js";
import connectDB from "./src/config/mongoose.js";

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
})();

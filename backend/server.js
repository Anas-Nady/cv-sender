const mongoose = require("mongoose");
const dotenv = require("dotenv");
const seeder = require("./seeder");

dotenv.config({ path: "./.env" });
const app = require("./app");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 5110;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});

import * as dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_DEV!;

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
});

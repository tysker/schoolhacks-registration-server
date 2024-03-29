import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Workshop from "../models/workshopModel";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_DEV;

mongoose
  .connect(DB!)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("DB connection failed!"));
// Read json file

const workshops = JSON.parse(
  fs.readFileSync(`${__dirname}/data.json`, "utf-8"),
);

// Import data to database
const importData = async () => {
  try {
    await Workshop.create(workshops);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all from collection
const deleteData = async () => {
  try {
    await Workshop.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

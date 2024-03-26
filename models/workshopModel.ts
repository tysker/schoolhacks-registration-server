import mongoose from "mongoose";
import { WorkshopItem } from "../types/types";

const workshopSchema = new mongoose.Schema<WorkshopItem>({
  title: {
    type: String,
    required: [true, "A workshop must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A workshop must have a description"],
    trim: true,
  },
  instructor: {
    type: String,
    required: [true, "A workshop must have an instructor"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "A workshop must have a date"],
  },
  weekday: {
    type: String,
    required: [true, "A workshop must have a weekday"],
  },
  time: {
    type: String,
    required: [true, "A workshop must have a time"],
  },
  location: {
    type: String,
    required: [true, "A workshop must have a place"],
  },
  price: {
    type: String,
    required: [true, "A workshop must have a price"],
  },
  image: {
    type: String,
    required: [true, "A workshop must have an image"],
  },
  seats: {
    type: Number,
    required: [true, "A workshop must have seats"],
  },
  isEnded: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Workshop = mongoose.model<WorkshopItem>("Workshop", workshopSchema);

export default Workshop;

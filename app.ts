import * as dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import express = require("express");
import { Express, Request, Response } from "express";
import morgan = require("morgan");
import workshopRoute from "./routes/workshopRoute";
import userRoute from "./routes/userRoute";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utility/appError";
import cors = require("cors");

const app: Express = express();
app.use(
  cors({
    // origin: ['https://example.com', 'https://bank.com', 'https://cph-business.dk'],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
    credentials: true, // allow session cookie from browser to pass through
    allowedHeaders: ["Content-Type", "Authorization"], // only allow these HTTP headers
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

app.options("*", cors()); // include before other routes

app.use(morgan("dev"));
app.use(express.json()); // Body parser for JSON data

app.use("/api/v1/workshops", workshopRoute);
app.use("/api/v1/users", userRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// @ts-ignore
app.use(globalErrorHandler);

export default app;

import { NextFunction, Request, Response } from "express";
import Workshop from "../models/workshopModel";
import AppError from "../utility/appError";
import catchAsync from "../utility/catchAsync";

export const getAllWorkshops = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const workshops = await Workshop.find();

    if (!workshops) {
      return next(new AppError("No workshops found", 404));
    }

    res.status(200).json({
      status: "success",
      results: workshops.length,
      workshops,
    });
  },
);

export const getWorkshopFromParamID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop) {
      return next(new AppError("No workshop found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      workshop,
    });
  },
);

// change workshop isEnded to true
export const updateWorkshopToIsEnded = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      { isEnded: true },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!workshop) {
      return next(new AppError("No workshop found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      workshop,
    });
  },
);

export const createWorkshop = catchAsync(
  async (req: Request, res: Response) => {
    const newWorkshop = await Workshop.create(req.body);

    res.status(201).json({
      status: "success",
      workshop: newWorkshop,
    });
  },
);

export const updateWorkshop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!workshop) {
      return next(new AppError("No workshop found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      workshop,
    });
  },
);

export const deleteWorkshop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);

    if (!workshop) {
      return next(new AppError("No workshop found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  },
);

import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import Workshop from "../models/workshopModel";
import AppError from "../utility/appError";
import catchAsync from "../utility/catchAsync";
import sendEmail from "../utility/email";

// get all users from a specific workshop
export const getAllUsersFromAWorkshop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_list = await Workshop.findById(req.params.id).populate(
      "users",
      "-__v",
    );

    if (!user_list) {
      return next(new AppError("No users found", 404));
    }

    res.status(200).json({
      status: "success",
      results: user_list.users!.length,
      data: user_list.users,
    });
  },
);

// create a new user
export const createUserAndAddToWorkshop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let title = "";
    let user_data = {
      _id: "",
      name: "",
      email: "",
    };

    const userDB = await User.findOne({ email: req.body.email }, "-__v");

    if (userDB) {
      const workshop = await Workshop.findById(req.params.id);
      title = workshop!.title;

      if (!workshop) {
        return next(new AppError("No workshop found with that ID", 404));
      }

      if (workshop.users!.includes(userDB._id)) {
        return next(
          new AppError("You are already registered for the event!", 400),
        );
      }

      if (workshop) {
        workshop.users!.push(userDB._id);
        await workshop.save();
      }

      user_data = {
        ...user_data,
        _id: userDB._id,
        name: userDB.name,
        email: userDB.email,
      };
    } else {
      const user = await User.create(req.body);
      const workshop = await Workshop.findById(req.params.id);
      title = workshop!.title;

      if (!workshop) {
        return next(new AppError("No workshop found with that ID", 404));
      }

      if (workshop) {
        workshop.users!.push(user._id);
        await workshop.save();
      }

      user_data = {
        ...user_data,
        _id: user._id,
        name: user.name,
        email: user.email,
      };
    }

    sendEmail({
      email: user_data.email,
      subject: "Welcome to the workshop!",
      message: `<div>
            <h4>Welcome to the ${title}</h4>
            <br>
            <p>Thank you for registering for the workshop.</p>
            <p>We are excited to have you join us. Please let us know if you have any questions or need any additional
            information.</p>
            <br>
            <p>Best regards,<br><br><span style="font-size: 20px">The SchoolHacks Team</span></p>
        </div>`,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: user_data,
      },
    });
  },
);

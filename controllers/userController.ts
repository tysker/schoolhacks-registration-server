import {NextFunction, Request, Response} from "express";
import User from "../models/userModel";
import Workshop from "../models/workshopModel";
import AppError from "../utility/appError";
import catchAsync from "../utility/catchAsync";
import sendEmail from "../utility/email";

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

export const createUserAndAddToWorkshop = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const user = await User.findOne({email: req.body.email}, "-__v");
        const workshop = await Workshop.findById(req.params.id);


        if (!workshop) {
            return next(new AppError("No workshop found with that ID", 404));
        }

        // Ensure the user is not already assigned to the workshop
        if (user && workshop.users!.includes(user._id)) {
            return next(new AppError("You are already registered for the event!", 400));
        }

        const usersSet = new Set(workshop.users); // Convert array to set for uniqueness

        if (user) {
            usersSet.add(user._id);
        } else {
            const newUser = await User.create(req.body);
            usersSet.add(newUser._id);
        }

        workshop.users = Array.from(usersSet); // Convert set back to array
        await workshop.save();


        sendEmailToUser({
            email: req.body.email,
            title: workshop.title,
        })


        res.status(201).json({
            status: "success",
            message: "User added to the workshop successfully",
        });

    },
);

type Mail = {
    email: string;
    title: string;
}


const sendEmailToUser = async function (mail: Mail) {

    await sendEmail({
        email: mail.email,
        subject: "Welcome to the workshop!",
        message: `<div>
              <h4>Welcome to the ${mail.title}</h4>
              <br>
              <p>Thank you for registering for the workshop.</p>
              <p>We are excited to have you join us. Please let us know if you have any questions or need any additional
              information.</p>
              <br>
              <p>Best regards,<br><br><span style="font-size: 20px">The SchoolHacks Team</span></p>
          </div>`,
    });
}


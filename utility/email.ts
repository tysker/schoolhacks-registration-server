import nodemailer from "nodemailer";
import AppError from "./appError";
// import * as dotenv from "dotenv";
//
// dotenv.config({path: "./config.env"});

type EmailOptions = {
    email: string;
    subject: string;
    message: string;
};
const sendEmail = async (options: EmailOptions) => {
    try {
        // 1) create a transporter
        const transporter = nodemailer.createTransport({
            // @ts-ignore
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            tls: {
                ciphers: process.env.EMAIL_CIPHERS,
            },
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // 2) define email options
        const mailOptions = {
            from: `SchoolHacks <${process.env.EMAIL_USERNAME}>`,
            to: options.email,
            subject: options.subject,
            html: options.message,
        };

        // 3) send the email
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;

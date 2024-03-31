import nodemailer from "nodemailer";
import AppError from "./appError";

type EmailOptions = {
    email: string;
    subject: string;
    message: string;
};

type GeneralOptions = {
    port: number;
    host: string;
    tls: {
        ciphers: string;
    }
    auth: {
        user: string;
        pass: string;
    }
}

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

        // 2) SMTP configuration
        const verify = await transporter.verify()

        if (verify) {
            console.log("Server is ready to take our messages");
        } else {
            console.log("Server is not ready to take our messages");
        }

        // 3) define email options
        const mailOptions = {
            from: `SchoolHacks <${process.env.EMAIL_USERNAME}>`,
            to: options.email,
            subject: options.subject,
            html: options.message,
        };

        // 4) send the email
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Error sending email:", error);
        throw new AppError("Error sending email", 500);
    }
};

export default sendEmail;

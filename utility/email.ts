import nodemailer from "nodemailer";
// import * as dotenv from "dotenv";
//
// dotenv.config({path: "./config.env"});

type EmailOptions = {
    email: string;
    subject: string;
    message: string;
};
const sendEmail = async (options: EmailOptions) => {

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
        from: "SchoolHacks <tyskerjoerg@outlook.com>",
        to: options.email,
        subject: options.subject,
        html: options.message,
    };
    console.log(process.env.EMAIL_USERNAME)

    // 3) send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (e: any) {
        console.log(e.message)
        console.log(e)
        throw new Error(e.message);
    }

};

export default sendEmail;

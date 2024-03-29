import nodemailer from "nodemailer";

interface Options {
    to: string,
    subject: string,
    text?: string,
    html?: string,
}

const sendEmail = async (options: Options) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        html: options.text

    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}

export default sendEmail;



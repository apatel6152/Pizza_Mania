import nodemailer from "nodemailer"
import sendgridtransport from 'nodemailer-sendgrid-transport';

export const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport(
    sendgridtransport({
      auth: {
        api_key: process.env.sendgrid_api,
      },
    })
  );

  const mailOptions = {
    from: process.env.SENDGRID_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.text,
  };

  await transporter.sendMail(mailOptions);
};

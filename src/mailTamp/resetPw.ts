
import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = "3ec03136d46a38f7c1c670d3479ff1cb";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

export async function sendResetPassword(email: string, resetToken: string) {
  try {
    const resetLink = `http://localhost:3000/resetPassword?token=${resetToken}`;
    const response = await transport.sendMail({
      from: sender,
      to: [email],
      subject: "Reset Password Link",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });
    console.log("Email sent:", response);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
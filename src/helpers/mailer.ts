import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { set } from "mongoose";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // and also use uuid library
    if (emailType === "VERIFY") {
      // Verification email logic
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 600000, // 600000 means current time se 10 min tak valid
        },
      });
    } else if (emailType === "RESET") {
      // Password reset email logic
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordExpiry: Date.now() + 600000, // 600000 means current time se 10 min tak valid
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/${emailType.toLowerCase()}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }. Or you can copy and paste this link into your browser: <br />
      ${process.env.DOMAIN}/${emailType.toLowerCase()}email?token=${hashedToken}
      </p>`, // HTML body
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error.message);
  }
};

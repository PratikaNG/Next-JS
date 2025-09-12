import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const sendEmail =  async ({email,emailType,userId} :any) => {
    try {
        // create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(),10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
            verifyToken:hashedToken,
            verifyTokenExpiry: Date.now() + 3600000
        })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000
        })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const mailOptions = {
            from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verify_email?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy paste the below link in your browser. <br>${process.env.domain}/verify_email?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        console.log("Mail error")
        return NextResponse.json({error:error.message},{status:400})
    }
}


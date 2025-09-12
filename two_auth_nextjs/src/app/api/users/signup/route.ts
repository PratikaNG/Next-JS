import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"



connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        console.log("reqBody",reqBody)
        const {username,email,password} = reqBody

        // check if user already exisists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exsists"},{status:400})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        // create user
        const newUser = await new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save();
        console.log("SavedUser",savedUser)

        // send verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({message: "Successfully creates user",success:true,savedUser},{status:201})
    } 
     // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (error: any) {
        console.log("Signup error",error)
        return NextResponse.json({error: error.message},{status:500})
    }
}

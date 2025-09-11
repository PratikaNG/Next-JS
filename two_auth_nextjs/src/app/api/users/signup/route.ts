import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"



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
        const savedUser = await newUser.save()
        return NextResponse.json({message: "Successfully creates user",success:true,savedUser},{status:201})
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}

import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody
        console.log("Login reqBody",reqBody)

        // check if user already exisists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User doesn't exsist"},{status:400})
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error: "Password incorrect"},{status:400})
        }

        // create token data
        const tokenData = {id:user._id,username:user.username,email:user.email}

        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success:true
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    } 
     // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (error: any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})}
    
    }
import getTokenData from "@/helpers/getTokenData";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"


connect();

export  async function GET(request:NextRequest){
    try {
        const currentUserId = await getTokenData(request);
        const user:any = await User.findOne({_id:currentUserId}).select("-password");
         return NextResponse.json({message:"User found",data:user},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}

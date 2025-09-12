import getTokenData from "@/helpers/getTokenData";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"


connect();

export  async function GET(request:NextRequest){
    try {
        const currentUserId = await getTokenData(request);
         // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        const user:any = await User.findOne({_id:currentUserId}).select("-password");
         return NextResponse.json({message:"User found",data:user},{status:200})
        }
         // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        catch (error:any) {
       
        return NextResponse.json({error:error.message},{status:400})
    }
}

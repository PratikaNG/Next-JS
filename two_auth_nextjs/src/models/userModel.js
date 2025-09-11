import mongoose from "mongoose"

const userSchema =  new mongoose.Schema({
 username:{
        type: String,
        required:[true,"Please enter username"],
        unique:true,
    },
 email:{
        type: String,
        required:[true,"Please enter email"],
        unique:true,
    },
    password:{
        type: String,
        required:[true,"Please enter password"],
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

export default mongoose.model('user',userSchema)
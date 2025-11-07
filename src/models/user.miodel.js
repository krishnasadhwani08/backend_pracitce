import mongoose,{schema} from "mongoose";

const UserSchema = new mongoose.schema({
    userName:{
        type:String,
        required : true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim: true,
        unique:true,
    },
    fullName:{
        type : String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,// here we  will store URL of the image that is stored in cloudinary
        required: true,
    },
    coverImage:{
        type:String, // cloudinary 
        required : true,
    },
    watchHistory:[{
        type:schema.Types.ObjectId,
        ref :"Video"
        }
    ],
    passwords:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String,

    }
    
},{timestamp:true})

export const User = mongoose.model("User",userSchema);
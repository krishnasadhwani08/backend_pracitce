import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    videoName :{
        type : String,
        required: true,
        trim:true,
    },
    videoFile :{
        type : String, // cloudinary url
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },discription : {
        type : String,
        required : true,
    },
    duration:{
        type:Number,//cloudinary
        required : true,
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type : Boolean,
        default : true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",

    }

},{timestamp : true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)
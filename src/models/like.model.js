import mongoose,{Schema} from "mongoose";

const likeSchema = mongoose({
    video:{
        type :Schema.Types.ObjectId,
        ref:"Video",
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    },
    tweet:{
        type:Schema.Types.ObjectId,
        ref:"Tweet",
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"Like",
    }
})

export const Like=mongoose.model("Like",commentSchema);
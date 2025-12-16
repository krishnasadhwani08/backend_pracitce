import mongoose,{Schema} from 'mongoose';

const subscriptionSchema = new Schema({
    subscriber : {
        type : Schema.Types.ObjectId,//the user that is subscribing
        ref : "User",
        required : true,
    },
    channel : {
        type : Schema.Types.ObjectId,//the user that is been subscribed by the subscriber
        ref : "User",
        required : true
    }

})

export const subscription = mongoose.model("Subscription",subscriptionSchema)
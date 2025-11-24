import mongoose from 'mongoose';

const subscriptionSchema = new Schema({
    subscriber : {
        type : Schema.Types.Objectid,//the user that is subscribing
        ref : "User"
    },
    channel : {
        type : Schema.Types.Objectid,//the user that is been subscribed by the subscriber
        ref : "User"
    }

})

export const subscription = mongoose.model("Subscription",subscriptionSchema)
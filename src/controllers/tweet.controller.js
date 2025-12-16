import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {

        const {content} = req.body;

        if(!content){
            throw new ApiError(400,"The content is requiered")
        }
        const tweet= await Tweet.create({
            content,
            owner:req.user._id
        })

        return res.status(200)
        .json(tweet,new ApiResponse(201,"The tweet is successfully sent"))


})

const getUserTweets = asyncHandler(async (req, res) => {
    const userTweets= await Tweet.find({owner:req.user?._id}).sort({createdBy:-1});

    return res
    .status(200)
    .json(new ApiResponse(200,userTweets,"The user tweets fetched successfully"))
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const {updatedTweet} = req.body;

    if(!updatedTweet){
        throw new ApiError(400,"Content is required")
    }
    const tweet=await Tweet.findOneAndUpdate({
        _id:tweetId,
        owner : req.user?._id
    },
    {$set:
        {
            content:updatedTweet
        }
    },{new:true});

     if (!tweet) {
        throw new ApiError(404, "Tweet not found or unauthorized");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,tweet,"Tweet updated successfully"))

})

const deleteTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params;
    if(!tweetId){
        throw new ApiError(400,"NO tweet found")
    }
    const tweet = await Tweet.findOneAndDelete({tweet :tweetId,owner:req.user?._id});

    return res.
    status(200).
    json(new ApiResponse(200,tweet,"Tweet updated successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
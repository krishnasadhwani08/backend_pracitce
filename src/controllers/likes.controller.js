import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* =======================
   TOGGLE VIDEO LIKE
======================= */
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user?._id;

    if (!userId) throw new ApiError(401, "Unauthorized");
    if (!videoId || !isValidObjectId(videoId))
        throw new ApiError(400, "Valid video ID is required");

    const isLiked = await Like.findOne({ video: videoId, likedBy: userId });

    if (isLiked) {
        await Like.deleteOne({ video: videoId, likedBy: userId });
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Successfully unliked")
        );
    }

    await Like.create({ video: videoId, likedBy: userId });

    return res.status(200).json(
        new ApiResponse(200, { liked: true }, "Successfully liked")
    );
});

/* =======================
   TOGGLE COMMENT LIKE
======================= */
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if (!userId) throw new ApiError(401, "Unauthorized");
    if (!commentId || !isValidObjectId(commentId))
        throw new ApiError(400, "Valid comment ID is required");

    const isLiked = await Like.findOne({ comment: commentId, likedBy: userId });

    if (isLiked) {
        await Like.deleteOne({ comment: commentId, likedBy: userId });
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Successfully unliked")
        );
    }

    await Like.create({ comment: commentId, likedBy: userId });

    return res.status(200).json(
        new ApiResponse(200, { liked: true }, "Successfully liked")
    );
});

/* =======================
   TOGGLE TWEET LIKE
======================= */
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!userId) throw new ApiError(401, "Unauthorized");
    if (!tweetId || !isValidObjectId(tweetId))
        throw new ApiError(400, "Valid tweet ID is required");

    const isLiked = await Like.findOne({ tweet: tweetId, likedBy: userId });

    if (isLiked) {
        await Like.deleteOne({ tweet: tweetId, likedBy: userId });
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Successfully unliked")
        );
    }

    await Like.create({ tweet: tweetId, likedBy: userId });

    return res.status(200).json(
        new ApiResponse(200, { liked: true }, "Successfully liked")
    );
});

/* =======================
   GET LIKED VIDEOS
======================= */
const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) throw new ApiError(401, "Unauthorized");

    const likes = await Like.find({ likedBy: userId })
        .populate({
            path: "video",
            select: "title thumbnail views createdAt owner"
        });

    const videos = likes
        .map(like => like.video)
        .filter(Boolean);

    return res.status(200).json(
        new ApiResponse(200, videos, "Liked videos fetched successfully")
    );
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
};

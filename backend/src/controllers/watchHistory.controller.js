import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { WatchHistory } from "../models/watchHistory.model.js";

const addToWatchHistory = asyncHandler(async (req, res) => {
    const { videoId, videoTitle, thumbnail } = req.body;

    if (!videoId || !videoTitle || !thumbnail) {
        throw new ApiError(400, "All fields are required");
    }

    const history = await WatchHistory.findOneAndUpdate(
        {
            user: req.user._id,
            videoId,
        },
        {
            $set: {
                videoTitle,
                thumbnail,
                createdAt: new Date(),
            },
        },
        {
            upsert: true,
            new: true,
        }
    );

    return res.status(200).json(
        new ApiResponse(200, history, "Watch history updated")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {

    const history = await WatchHistory.find({
        user: req.user._id
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, history, "Watch history fetched")
    );
});

export {
    addToWatchHistory,
    getWatchHistory,
};
import { Note } from "../models/note.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const myNotes = asyncHandler(async (req, res) => {
  const notes = await Note.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
    {
      $group: {
        _id: "$videoId",
        videoTitle: { $first: "$videoTitle" },
        notesCount: { $sum: 1 },
        updatedAt: { $first: "$updatedAt" },
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "My Notes fetched successfully"));
});

export default myNotes;

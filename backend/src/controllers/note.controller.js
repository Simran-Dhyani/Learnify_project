import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";

const createNote = asyncHandler(async (req, res) => {
  const { videoId, content } = req.body;
  const videoTitle = req.body.videoTitle?.trim() || `YouTube Video ${videoId}`;

  if (!videoId || !content?.trim()) {
    throw new ApiError(400, "videoId and content are required");
  }

  const currentUser = req.user?._id;

  const notes = await Note.create({
    user: currentUser,
    videoId,
    content: content.trim(),
    videoTitle,
  });

  if (!notes) {
    throw new ApiError(409, "Notes not found !!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, notes, "Notes saved successfully !!"));
});

const getNotes = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const notes = await Note.find({
    user: req.user?._id,
    videoId,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  await Note.findOneAndDelete({
    _id: noteId,
    user: req.user._id,
  });

  return res.status(200).json(new ApiResponse(200, {}, "Note deleted"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "content is required");
  }

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      user: req.user._id,
    },
    {
      content: content.trim(),
    },
    {
      new: true,
    }
  );

  return res.status(200).json(new ApiResponse(200, note, "Note updated"));
});

export { createNote, getNotes, deleteNote, updateNote };

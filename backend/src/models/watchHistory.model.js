import mongoose, { Schema } from "mongoose";

const watchHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    videoId: {
      type: String,
      required: true,
    },

    videoTitle: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WatchHistory = mongoose.model(
  "WatchHistory",
  watchHistorySchema
);
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: { gameId: mongoose.Schema.Types.ObjectId, ref: "User" },
    game: { gameId: mongoose.Schema.Types.ObjectId, ref: "Game" },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;

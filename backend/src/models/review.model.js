import mongoose, { isValidObjectId } from "mongoose";
import { z } from "zod";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;

const reviewSchemaValidator = z.object({
  user: z.string().refine((value) => isValidObjectId(value)),
  game: z.string().refine((value) => isValidObjectId(value)),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1).max(2000).trim(),
});

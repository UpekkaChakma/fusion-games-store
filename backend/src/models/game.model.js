import mongoose, { isValidObjectId } from "mongoose";
import { z } from "zod";

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    images: [String],
    developer: String,
    publisher: String,
    price: Number,
    releaseDate: Date,
    genre: [String],
    platforms: [String],
    description: [String],
    minimumRequirements: {
      ram: String,
      cpu: String,
      gpu: String,
      storage: String,
    },
    languages: [String],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    tags: [String],
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;

const gameSchemaValidator = z.object({
  title: z.string().min(3).max(90).trim(),
  developer: z.string().min(3).max(90).trim(),
  publisher: z.string().min(3).max(90).trim(),
  images: z.array(z.string().url()),
  price: z.number().min(0).max(99),
  releaseDate: z.coerce.date(),
  genres: z
    .array(
      z.enum([
        "Action",
        "Adventure",
        "Role-Playing Game (RPG)",
        "Platform",
        "Shooter",
        "Sports",
        "Strategy",
        "Simulation",
        "Puzzle",
        "Fighting",
        "Horror",
        "Racing",
      ])
    )
    .nonempty(),
  platforms: z.array(
    z.enum(["Windows", "Linux", "Mac", "PlayStation", "Xbox", "Switch"])
  ),
  languages: z
    .array(
      z.enum([
        "English",
        "Mandarin Chinese",
        "Hindi",
        "Spanish",
        "French",
        "Standard Arabic",
        "Bengali",
        "Russian",
        "Portuguese",
        "Urdu",
        "Indonesian",
        "German",
        "Japanese",
        "Korean",
      ])
    )
    .nonempty(),
  minimumRequirements: z
    .object({
      ram: z.string().min(3).max(90).optional(),
      cpu: z.string().min(3).max(90).optional(),
      gpu: z.string().min(3).max(90).optional(),
      storage: z.string().min(3).max(90).optional(),
    })
    .optional(),
  description: z.array(z.string().min(20).max(2000)).nonempty(),
  review: z.string().refine((value) => isValidObjectId(value)),
  tags: z.array(z.string().min(3)).optional(),
  archived: z.boolean().optional(),
});

import mongoose from "mongoose";
import { z } from "zod";
import { ZString } from "../utils/custom-zod-schema.js";
import {
  VIDEO_GAME_GENRES,
  VIDEO_GAME_LANGUAGES,
  VIDEO_GAME_PLATFORMS,
} from "../constants/index.js";

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    developer: String,
    publisher: String,
    images: [String],
    price: Number,
    releaseDate: Date,
    genre: [String],
    platforms: [String],
    languages: [String],
    description: [String],
    minimumRequirements: {
      ram: String,
      cpu: String,
      gpu: String,
      storage: String,
    },
    tags: [String],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const gameSchemaValidator = z.object({
  title: new ZString().onlySpaceHyphenDotAlphabetNumChar(),
  developer: new ZString().onlySpaceHyphenDotAlphabetNumChar(),
  publisher: new ZString().onlySpaceHyphenDotAlphabetNumChar(),
  images: z.array(z.string().url()).nonempty(),
  price: z.number().min(0).max(99),
  releaseDate: z.coerce.date(),
  genres: z.array(z.enum(VIDEO_GAME_GENRES)).nonempty(),
  platforms: z.array(z.enum(VIDEO_GAME_PLATFORMS)).nonempty(),
  languages: z.array(z.enum(VIDEO_GAME_LANGUAGES)).nonempty(),
  description: z
    .array(
      new ZString({
        min: 20,
        max: 5000,
        isOptional: true,
      }).removeMultiWhiteSpaces()
    )
    .nonempty(),
  minimumRequirements: z
    .object({
      ram: new ZString().removeMultiWhiteSpaces(),
      cpu: new ZString().removeMultiWhiteSpaces(),
      gpu: new ZString().removeMultiWhiteSpaces(),
      storage: new ZString().removeMultiWhiteSpaces(),
    })
    .partial(),
  tags: z
    .array(new ZString().onlySpaceHyphenDotAlphabetNumChar())
    .nonempty()
    .optional(),
  isArchived: z.boolean().default(false).optional(),
});

gameSchema.pre("save", async function validateData(next) {
  try {
    const validatedData = gameSchemaValidator.parse(this.body);
    this.body = validatedData;
    return next();
  } catch (error) {
    return next(error);
  }
});

const Game = mongoose.model("Game", gameSchema);
export default Game;

import mongoose from "mongoose";
import { z } from "zod";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    avatar: String,
    refreshToken: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

const userSchemaValidator = z.object({
  username: z.string().min(3).max(40),
  email: z.string().trim().email(),
  password: z.string().min(8).max(20),
  avatar: z.string().url().optional(),
});

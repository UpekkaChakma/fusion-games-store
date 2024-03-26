import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
    },
    refreshToken: String,
    orderHistory: { gameId: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

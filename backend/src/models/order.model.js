import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { gameId: mongoose.Schema.Types.ObjectId, ref: "User" },
    game: { gameId: mongoose.Schema.Types.ObjectId, ref: "Game" },
    price: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

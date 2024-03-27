import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    purchasedPrice: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

const orderSchemaValidator = z.object({
  owner: z.string().refine((value) => isValidObjectId(value)),
  game: z.string().refine((value) => isValidObjectId(value)),
  purchasedPrice: z.number().min(0).max(99),
});

import mongoose from "mongoose";

const menuConfigSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    backgroundColor: { type: String, required: true },
    fontFamily: {
      name: { type: String, required: true },
      class: { type: String, required: true },
    },
    categoryTitleColor: { type: String, required: true },
    categoryTitleSize: { type: Number, required: true },
    productTitleColor: { type: String, required: true },
    productTitleSize: { type: Number, required: true },
    productPriceColor: { type: String, required: true },
    productPriceSize: { type: Number, required: true },
    productDescriptionColor: { type: String, required: true },
    productDescriptionSize: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.MenuConfig ||
  mongoose.model("MenuConfig", menuConfigSchema);

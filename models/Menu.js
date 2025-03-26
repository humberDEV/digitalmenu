import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  categories: [
    {
      name: { type: String, required: true },
      description: { type: String },
      products: [
        {
          name: { type: String, required: true },
          description: { type: String },
          price: { type: Number, required: true },
        },
      ],
    },
  ],
});

const Menu = mongoose.models.Menu || mongoose.model("Menu", MenuSchema);

export default Menu;

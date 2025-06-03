import mongoose from "mongoose";

const BusinessDataSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  restaurantId: {
    type: String,
    required: true,
    unique: true,
  },
  subtitle: { type: String, default: "" },
  logoUrl: { type: String, default: null },
  phone: { type: String, default: "" },
  languages: { type: [String], default: [] },
  socialLinks: {
    type: Map,
    of: String,
    defauxlt: {},
  },
  deliveryLinks: {
    type: Map,
    of: String,
    default: {},
  },
  showReviewButton: { type: Boolean, default: false },
  theme: {
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#000000" },
    fontFamily: {
      name: { type: String, default: "Poppins" },
      class: { type: String, default: "font-poppins" },
    },
  },
});

export default mongoose.models.BusinessData ||
  mongoose.model("BusinessData", BusinessDataSchema);

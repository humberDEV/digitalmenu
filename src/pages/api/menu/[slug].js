import Restaurant from "../../../../models/Company";
import BusinessData from "../../../../models/BusinessData";
import connectDB from "../../../../lib/mongodb";

export default async function handler(req, res) {
  await connectDB();

  const { slug } = req.query;

  if (!slug) return res.status(400).json({ error: "Missing slug" });

  const restaurant = await Restaurant.findOne({
    email: { $regex: `^${slug}@`, $options: "i" },
  });

  if (!restaurant)
    return res.status(404).json({ error: "Restaurant not found" });

  const businessData = await BusinessData.findOne({
    restaurantId: restaurant._id,
  });

  res.status(200).json(businessData || null);
}

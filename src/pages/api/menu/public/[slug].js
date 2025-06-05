import connectDB from "../../../../../lib/mongodb";
import Restaurant from "../../../../../models/Company";
import MenuConfig from "../../../../../models/MenuConfig";
import Menu from "../../../../../models/Menu";

export default async function handler(req, res) {
  await connectDB();

  const { slug } = req.query;

  if (!slug) return res.status(400).json({ error: "Falta el slug." });

  const restaurant = await Restaurant.findOne({
    email: { $regex: `^${slug}@`, $options: "i" },
  });

  if (!restaurant)
    return res.status(404).json({ error: "Restaurante no encontrado." });

  const [menuData, menuConfig] = await Promise.all([
    Menu.findOne({ restaurantId: restaurant._id }),
    MenuConfig.findOne({ restaurantId: restaurant._id }),
  ]);

  res.status(200).json({
    menuData: menuData?.categories || [],
    menuConfig: menuConfig || {},
  });
}

import jwt from "jsonwebtoken";
import MenuConfig from "../../../../models/MenuConfig";
import connectDB from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  await connectDB();

  try {
    // 1️⃣ Obtener y verificar el token
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: Token faltante" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "No autorizado: Token inválido" });
    }

    // 2️⃣ Intentar obtener la configuración desde la base de datos
    let menuConfig = await MenuConfig.findOne({ restaurantId: decoded.userId });

    // Si no existe, crear una configuración por defecto
    if (!menuConfig) {
      menuConfig = await MenuConfig.create({
        restaurantId: decoded.userId,
        backgroundColor: "#f5f5f5",
        fontFamily: { name: "Poppins", class: "font-poppins" },
        categoryTitleColor: "#333333",
        categoryTitleSize: 40,
        productTitleColor: "#ff0000",
        productTitleSize: 20,
        productPriceColor: "#0000ff",
        productPriceSize: 16,
        productDescriptionColor: "#0000ff",
        productDescriptionSize: 14,
      });
    }

    return res.status(200).json({ config: menuConfig });
  } catch (error) {
    console.error("Error al obtener la configuración:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

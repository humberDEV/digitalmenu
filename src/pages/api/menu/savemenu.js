import jwt from "jsonwebtoken";
import Menu from "../../../../models/Menu";
import connectDB from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  await connectDB();

  try {
    // 1️⃣ Obtener y verificar el token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: Token faltante" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "No autorizado: Token inválido" });
    }

    // 2️⃣ Obtener las categorías del body
    const { categories } = req.body;
    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    console.log("Categorías recibidas:", categories);

    console.log("ID del restaurante:", decoded.userId);

    console.log("Token decodificado:", decoded);

    // 3️⃣ Guardar o actualizar el menú en la base de datos
    const updatedMenu = await Menu.findOneAndUpdate(
      { restaurantId: decoded.userId },
      { categories },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ message: "Menú guardado correctamente", menu: updatedMenu });
  } catch (error) {
    console.error("Error al guardar el menú:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

import jwt from "jsonwebtoken";
import Menu from "../../../../models/Menu";
import connectDB from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  await connectDB();

  try {
    // 1️⃣ Obtener el token del header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: Token faltante" });
    }

    const token = authHeader.split(" ")[1];

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("Token recibido:", token);

    // 2️⃣ Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "No autorizado: Token inválido" });
    }

    // 3️⃣ Buscar el menú asociado al restaurantId (userId)
    const menu = await Menu.findOne({ restaurantId: decoded.userId });

    if (!menu) {
      return res.status(404).json({ message: "No se encontró el menú." });
    }

    // 4️⃣ Retornar el menú
    return res.status(200).json({ categories: menu?.categories || [] });
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

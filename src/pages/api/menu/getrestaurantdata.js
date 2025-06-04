import jwt from "jsonwebtoken";
import restaurants from "../../../../models/Company";
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

    // 2️⃣ Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "No autorizado: Token inválido" });
    }

    // 3️⃣ Buscar el restaurant asociado al _id (userId)
    const restaurant = await restaurants.findOne({
      _id: decoded.userId,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "No se encontró el restaurant." });
    }

    // 4️⃣ Retornar el restaurant de la base de datos
    return res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

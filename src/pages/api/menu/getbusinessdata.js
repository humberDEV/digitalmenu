import jwt from "jsonwebtoken";
import BusinessData from "../../../../models/BusinessData";
import connectDB from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  await connectDB();

  try {
    // 1️⃣ Obtener y verificar el token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: Token faltante" });
    }

    // 2️⃣ Obtener el token y verificar su validez
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "No autorizado: Token inválido" });
    }

    // 3️⃣ Obtener los datos del negocio
    let businessData = await BusinessData.findOne({
      restaurantId: decoded.userId,
    });

    if (!businessData) {
      businessData = new BusinessData({
        restaurantId: decoded.userId,
      });
      await businessData.save();
    }

    // 4️⃣ Retornar los datos del negocio
    return res.status(200).json(businessData);
  } catch (error) {
    console.error("Error al obtener los datos del negocio:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

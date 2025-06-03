import jwt from "jsonwebtoken";
import BusinessData from "../../../../models/BusinessData";
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

    // 2️⃣ Obtener el token y verificar su validez
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "No autorizado: Token inválido" });
    }

    // 3️⃣ Guardar o actualizar los datos del negocio en la base de datos
    const updated = await BusinessData.findOneAndUpdate(
      { restaurantId: decoded.userId },
      { ...req.body, restaurantId: decoded.userId },
      { new: true, upsert: true }
    );

    // 4️⃣ Retornar los datos actualizados
    return res.status(200).json({
      message: "Datos del negocio guardados correctamente",
      data: updated,
    });
  } catch (error) {
    console.error("Error al guardar los datos del negocio:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

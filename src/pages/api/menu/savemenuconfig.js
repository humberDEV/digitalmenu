import jwt from "jsonwebtoken";
import MenuConfig from "../../../../models/MenuConfig"; // Asegúrate de que tienes este modelo
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

    // 2️⃣ Obtener la configuración del menú desde el body
    const {
      backgroundColor,
      fontFamily,
      categoryTitleColor,
      categoryTitleSize,
      productTitleColor,
      productTitleSize,
      productPriceColor,
      productPriceSize,
      productDescriptionColor,
      productDescriptionSize,
    } = req.body.menuConfig;

    // Validar que los datos del menú sean correctos
    if (
      !backgroundColor ||
      !fontFamily ||
      !categoryTitleColor ||
      !categoryTitleSize ||
      !productTitleColor ||
      !productTitleSize ||
      !productPriceColor ||
      !productPriceSize ||
      !productDescriptionColor ||
      !productDescriptionSize
    ) {
      return res
        .status(400)
        .json({ message: "Datos de configuración inválidos" });
    }

    // 3️⃣ Guardar o actualizar la configuración del menú
    const updatedConfig = await MenuConfig.findOneAndUpdate(
      { restaurantId: decoded.userId },
      {
        backgroundColor,
        fontFamily,
        categoryTitleColor,
        categoryTitleSize,
        productTitleColor,
        productTitleSize,
        productPriceColor,
        productPriceSize,
        productDescriptionColor,
        productDescriptionSize,
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "Configuración guardada correctamente",
      config: updatedConfig,
    });
  } catch (error) {
    console.error("Error al guardar la configuración:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

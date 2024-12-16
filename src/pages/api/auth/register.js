import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Restaurant from "../../../../models/Company";
import { setCookie } from "nookies";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    try {
      const existingRestaurant = await Restaurant.findOne({ email });
      if (existingRestaurant) {
        return res
          .status(400)
          .json({ message: "El correo electrónico ya está registrado." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newRestaurant = new Restaurant({
        name,
        email,
        password: hashedPassword,
      });

      await newRestaurant.save();

      const token = jwt.sign(
        { email, id: newRestaurant._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res
        .status(201)
        .json({ message: "Empresa registrada exitosamente.", token: token });
    } catch (error) {
      console.error("Error al registrar la empresa:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};

export default handler;

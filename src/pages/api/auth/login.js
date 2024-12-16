import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../../models/Company";
import connectDB from "../../../../lib/mongodb";

await connectDB();
let loginAttempts = {};

const MAX_ATTEMPTS = 7;
const WINDOW_TIME = 15 * 60 * 1000;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Por favor, ingrese el correo electrónico y la contraseña.",
      });
    }

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (loginAttempts[ip]) {
      const { attempts, lastAttempt } = loginAttempts[ip];
      const now = Date.now();

      if (now - lastAttempt > WINDOW_TIME) {
        loginAttempts[ip] = { attempts: 0, lastAttempt: now };
      } else if (attempts >= MAX_ATTEMPTS) {
        return res.status(429).json({
          message:
            "Demasiados intentos de inicio de sesión. Intenta más tarde.",
        });
      }
    } else {
      loginAttempts[ip] = { attempts: 0, lastAttempt: Date.now() };
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        loginAttempts[ip].attempts++;
        return res.status(401).json({ message: "Credenciales incorrectas." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        loginAttempts[ip].attempts++;
        return res.status(401).json({ message: "Credenciales incorrectas." });
      }

      loginAttempts[ip] = { attempts: 0, lastAttempt: Date.now() };

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        message: "Inicio de sesión exitoso.",
        token: token,
      });
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};

export default handler;

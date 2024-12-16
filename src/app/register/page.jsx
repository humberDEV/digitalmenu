"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { setCookie, parseCookies } from "nookies";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const checkToken = async () => {
      const cookies = parseCookies();
      const token = cookies.token;
      console.log("token:", token);

      if (token) {
        router.push("/admin");
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    if (pathname.startsWith("/register")) {
      document.title = "DigiMenu - Nuevo usuario";
    }
  }, [pathname]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Correo electrónico inválido.");
      setEmailValid(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "La contraseña debe tener al menos una minúscula, una mayúscula y un número."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      setCookie(null, "token", data.token, { path: "/" });
      toast.success("¡Registro exitoso!");
      router.push("/admin");
    } else {
      const data = await response.json();
      toast.error(data.message || "Hubo un error en el registro.");
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center px-4 py-8 bg-slate-100">
      <div className="w-full max-w-lg space-y-6 p-6 bg-slate-100">
        {/* Botón de volver */}
        <button className="absolute top-6 left-6 text-teal-600 text-xl mb-4">
          <a href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <span>Volver</span>
          </a>
        </button>

        <h2 className="text-4xl font-bold text-center text-gray-900">
          Registrarse
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-labelledby="register-form"
        >
          {/* Nombre de la empresa */}
          <div className="form-control w-full">
            <label htmlFor="name" className="text-gray-700 text-md">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-400 text-lg py-3 mt-2"
              placeholder="Nombre de la empresa"
              aria-label="Nombre de la empresa"
            />
          </div>

          {/* Correo electrónico */}
          <div className="form-control w-full">
            <label htmlFor="email" className="text-gray-700 text-md">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-400 text-lg py-3 mt-2 ${
                !emailValid ? "border-red-500" : ""
              }`}
              placeholder="ejemplo@dominio.com"
              aria-label="Correo electrónico"
            />
          </div>

          {/* Contraseña */}
          <div className="form-control w-full">
            <label htmlFor="password" className="text-gray-700 text-md">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-400 text-lg py-3 mt-2"
              placeholder="********"
              aria-label="Contraseña"
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-control w-full">
            <label htmlFor="confirmPassword" className="text-gray-700 text-md">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-400 text-lg py-3 mt-2"
              placeholder="********"
              aria-label="Confirmar contraseña"
            />
          </div>

          <div className="form-control w-full">
            <button
              type="submit"
              className="btn btn-lg bg-teal-500 text-white rounded-lg px-6 py-3 shadow-md hover:bg-teal-600 w-full mt-6"
              aria-label="Registrarse"
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="text-center text-lg">
          <p className="text-gray-700">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-teal-600 font-semibold">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

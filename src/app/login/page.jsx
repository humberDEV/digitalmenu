"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie, parseCookies } from "nookies";
import { usePathname } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkToken = async () => {
      const cookies = parseCookies();
      const token = cookies.token;

      console.log(token);
      if (token && token !== "null") {
        router.push("/admin");
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    if (pathname?.startsWith("/login")) {
      document.title = "MenuPage - iniciar sesión";
    }
  }, [pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, ingrese su correo electrónico y contraseña.");
      return;
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("¡Inicio de sesión exitoso!");

      setCookie(null, "token", data.token, { path: "/" });

      router.push("/admin");
    } else {
      const data = await response.json();
      if (response.status === 401) {
        toast.error(data.message || "Credenciales incorrectas.");
      } else if (response.status === 429) {
        toast.error(
          data.message || "Demasiados intentos. Intenta de nuevo más tarde."
        );
      } else {
        toast.error(data.message || "Hubo un error en el inicio de sesión.");
      }
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center px-4 py-8 bg-slate-100 relative">
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
          Iniciar sesión
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-labelledby="login-form"
        >
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
              className="input input-bordered w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-400 text-lg py-3 mt-2"
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

          <div className="form-control w-full">
            <button
              type="submit"
              className="btn btn-lg bg-teal-500 text-white rounded-lg px-6 py-3 shadow-md hover:bg-teal-600 w-full mt-6"
              aria-label="Iniciar sesión"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="text-center text-lg">
          <p className="text-gray-700">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-teal-600 font-semibold">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

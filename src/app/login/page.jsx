"use client";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos (por ejemplo, aquí solo estamos comprobando que no estén vacíos)
    if (!email || !password) {
      toast.error("Por favor, ingrese su correo electrónico y contraseña.");
      return;
    }

    // Si todo está bien, simula un inicio de sesión exitoso
    toast.success("¡Inicio de sesión exitoso!");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <section className="min-h-screen flex justify-center items-center px-4 py-8 bg-slate-100 relative">
      <div className="w-full max-w-lg space-y-6">
        {/* Botón de volver */}
        <button className="absolute top-8 left-8 flex items-center text-teal-600 text-xl mb-4">
          <a href="/" className="flex flex-row space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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

        {/* Título */}
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Iniciar sesión
        </h2>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-labelledby="login-form"
        >
          <div className="form-control w-full">
            <label htmlFor="email" className="label text-gray-800">
              <span className="label-text text-xl">Correo electrónico</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full bg-white shadow-md focus:ring-2 focus:ring-teal-500 text-lg py-3"
              placeholder="ejemplo@dominio.com"
              aria-label="Correo electrónico"
            />
          </div>

          <div className="form-control w-full">
            <label htmlFor="password" className="label text-gray-800">
              <span className="label-text text-xl">Contraseña</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full bg-white shadow-md focus:ring-2 focus:ring-teal-500 text-lg py-3"
              placeholder="********"
              aria-label="Contraseña"
            />
          </div>

          {/* Botón de inicio de sesión */}
          <div className="form-control w-full">
            <button
              type="submit"
              className="btn btn-md md:btn-lg bg-teal-100 text-black  rounded-lg px-6 py-3 shadow-lg hover:bg-teal-200"
              aria-label="Iniciar sesión"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        {/* Enlace de registro */}
        <div className="text-center text-lg">
          <p className="text-gray-800">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="link link-primary text-teal-600">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

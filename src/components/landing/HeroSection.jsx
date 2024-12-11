import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center h-[90vh] text-center px-4 mt-4 md:mt-10">
      <div className="flex flex-col items-center w-full mx-auto space-y-8 sm:space-y-10 ">
        {/* Título */}
        <h1
          className="text-2xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Tu menú digital{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-2 rounded-lg inline-block -rotate-1 hover:rotate-0 transition-transform">
            en minutos
          </span>
          {""}, sin complicaciones
        </h1>

        {/* Subtítulo */}
        <p className="text-md sm:text-lg md:text-2xl text-gray-700 max-w-5xl font-semibold">
          Transforma la forma en que tus clientes ven tu negocio. Crea tu menú
          digital rápido, sin complicaciones y listo para usar.
        </p>

        {/* Botón de acción */}
        <div className="mt-4 sm:mt-6">
          <a href="#contact">
            <button
              className="btn bg-teal-100 text-black border-2 
              border-black rounded-full btn-lg px-8 shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-300"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Pide ahora una prueba gratuita</span>
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
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>
              </span>
            </button>
          </a>
        </div>

        {/* Testimonio */}
        <div className="text-gray-600 mt-6 sm:mt-8">
          <p className="text-base sm:text-md font-thin">
            Únete a más de 12 restaurantes{" "}
            <span className="text-teal-600">que ya confían</span> en DigiMenu.
          </p>
        </div>

        {/* Imagen decorativa */}
        <div className="mt-6 sm:mt-8">
          <Image
            src="/hero_qr.png"
            alt="Vista previa del menú digital"
            width={600}
            height={600}
            className="w-full max-w-md sm:max-w-lg md:max-w-2xl"
          />
        </div>
      </div>
    </section>
  );
}

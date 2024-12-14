import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 max-w-screen-2xl mx-auto min-h-[85vh]">
      {/* Contenido textual */}
      <div className="flex-1 text-center md:text-left space-y-6">
        {/* Título */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Tu menú digital
          <span className="ml-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-2 py-1 rounded-lg inline-block -rotate-1 hover:rotate-0 transition-transform">
            en minutos
          </span>
          {", sin complicaciones"}
        </h1>

        {/* Subtítulo */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-semibold">
          Transforma la forma en que tus clientes ven tu negocio. Tus clientes
          podrán ver el menú de tu restaurante a través de QR o página web
        </p>

        {/* Botón de acción */}
        <div className="mt-4 sm:mt-6 space-y-2 md:space-y-0 space-x-0 md:space-x-4 flex flex-col md:flex-row">
          <a href="#contact">
            <button className="btn btn-md md:btn-lg bg-teal-100 text-black border-2 border-black rounded-full px-6 py-3 shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-300">
              <span className="flex items-center justify-center space-x-2">
                <span>Solicitar llamada</span>
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
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </span>
            </button>
          </a>
          <a href="#contact">
            <button className="btn btn-md md:btn-lg bg-teal-100 text-black border-2 border-black rounded-full px-6 py-3 shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-300">
              <span className="flex items-center justify-center space-x-2">
                <span>Enviar whatsapp</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
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
          <p className="text-sm sm:text-base md:text-lg font-light">
            Únete a más de 12 restaurantes
            <span className="text-teal-600 font-medium"> que ya confían </span>
            en DigiMenu.
          </p>
        </div>

        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          <div className="avatar border-0 bg-slate-100">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar border-0 bg-slate-100">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar border-0 bg-slate-100">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12">
              <span>+12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen */}
      <div className="flex mb-8 justify-center w-full md:w-2/5">
        <Image
          src="/hero_qr.png"
          alt="Vista previa del menú digital"
          width={600}
          height={600}
          className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>
    </section>
  );
}

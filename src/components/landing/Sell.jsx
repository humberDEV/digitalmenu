export default function Sell() {
  return (
    <section className="flex items-center justify-center h-screen text-center px-4 bg-teal-300 text-black">
      <div className="flex flex-row justify-center p-12">
        <div className="flex flex-col items-center w-full mx-auto space-y-4 sm:space-y-6 size-1/2">
          {/* Título */}
          <h1
            className="text-start text-xl font-extrabold sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Ahorra tiempo{" "}
            <span className="text-blue-800"> mostrando tus platos</span>
            {""}, de manera optimizada, y para todo el mundo
          </h1>
          <p className="text-start text-base sm:text-md md:text-lg text-gray-700">
            Con DigiPage puedes mostrarle a tus clientes tu restaurante. Tendrás
            un QR para imprimir que siempre te llevará a tu propia página web.
            Esta página web tendrá tu menu digital y tu información de empresa:
            Número de teléfono, redes sociales y google maps (business).
          </p>
        </div>

        <div className=" size-1/2">imagen</div>
      </div>
    </section>
  );
}

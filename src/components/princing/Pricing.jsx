"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const pricing = [
  {
    title: "Esencial",
    originalPrice: "10,90€",
    price: "8,90€",
    discount: "-15% off",
    features: [
      "🧑‍🍳 Un menú bonito y funcional en minutos (sin imágenes)",
      "🖥️ Página web personalizable",
      "🗣️ Disponible en 1 idioma",
      "🏷️ Añade tu logo, contacto y enlaces a delivery",
      "📱 Código QR para mostrar el menú a tus clientes",
    ],
    paymentLink: "https://buy.stripe.com/test_XXXXXXX",
  },
  {
    title: "Profesional",
    originalPrice: "18,90€",
    price: "14,90€",
    discount: "-15% off",
    features: [
      "Todo lo del plan Esencial",
      "📸 Añade imágenes irresistibles a tus platos",
      "🌍 Tradúcelo hasta a 5 idiomas para turistas",
      "⭐ Activa reseñas directas a Google desde tu web",
      "📊 Estadísticas de clics y redirecciones",
      "🖨️ Descarga tu carta lista para imprimir",
      "💬 Soporte prioritario por WhatsApp",
    ],
    paymentLink: "https://buy.stripe.com/test_YYYYYYY",
  },
];

const anualPricing = [
  {
    title: "Esencial",
    originalPrice: "130,80€",
    price: "79,00€",
    discount: "-40% off",
    features: [
      "🧑‍🍳 Crea un menú bonito y funcional en minutos",
      "🗣️ Disponible en 1 idioma",
      "🏷️ Incluye logo, contacto y links a delivery",
      "🖥️ Página web personalizable",
      "📱 Código QR para mostrar el menú a tus clientes",
    ],
    paymentLink: "https://buy.stripe.com/test_ZZZZZZZ", // Enlace de pago de Stripe para el plan Básico anual
  },
  {
    title: "Profesional",
    originalPrice: "226,80€",
    price: "139,00€",
    discount: "-38% off",
    features: [
      "Todo lo del plan Esencial",
      "📸 Añade imágenes irresistibles a tus platos",
      "🌍 Tradúcelo hasta a 5 idiomas para turistas",
      "⭐ Activa reseñas de Google desde el menú",
      "💬 Soporte rápido por WhatsApp",
      "📊 Estadísticas de clics y vistas por plato",
      "🖨️ Descarga tu carta lista para imprimir",
    ],
    paymentLink: "https://buy.stripe.com/test_AAAAAAA", // Enlace de pago de Stripe para el plan Premium anual
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const currentPricing = isAnnual ? anualPricing : pricing;

  const handleSelectPlan = (plan) => () => {
    if (isAuthenticated) {
      window.open(plan.paymentLink, "_blank");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="bg-light py-10 ">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-dark">Planes de Precios</h2>
        <p className="text-md mt-2 text-gray-600 max-w-2xl mx-auto">
          Planes pensados para restaurantes modernos 🍽️ Empieza con lo esencial
          o dale a tu carta el poder de atraer más clientes.
        </p>

        {/* Switch para cambiar entre mensual y anual */}
        <div className="flex justify-center items-center mt-6">
          <span className="text-gray-600 mr-2">Mensual</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isAnnual}
            onChange={() => setIsAnnual(!isAnnual)}
          />
          <span className="text-gray-600 ml-2">Anual (ahorra más)</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {currentPricing.map((plan, index) => (
            <div
              key={index}
              className={`bg-white shadow-xl border rounded-3xl p-8 transition duration-300 ${
                plan.title === "Profesional"
                  ? "border-purple-600 ring-2 ring-purple-200"
                  : "border-gray-200 hover:shadow-2xl"
              } relative`}
            >
              {plan.title === "Profesional" && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-tr-3xl rounded-bl-3xl">
                  Más Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-dark mb-2">
                {plan.title}
              </h3>
              <p className="text-lg text-green-600 mb-1 font-medium">
                {plan.discount}
              </p>
              <p className="text-3xl font-semibold text-dark flex items-center justify-center">
                <span className="line-through text-gray-400 text-xl mr-2">
                  {plan.originalPrice}
                </span>
                {plan.price}
                {isAnnual && (
                  <span className="text-sm text-gray-500">/año</span>
                )}
                {!isAnnual && (
                  <span className="text-sm text-gray-500">/mes</span>
                )}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-left text-gray-700"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`btn mt-6 w-full rounded-full py-3 font-medium transition ${
                  plan.title === "Profesional"
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "btn-primary text-white"
                }`}
                onClick={handleSelectPlan(plan)}
              >
                Elegir {plan.title}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-10 text-md text-gray-500">
          💡 ¿Sabías que los menús con fotos y varios idiomas reciben hasta un
          40% más de interacción? Convierte tu carta en una herramienta para{" "}
          <strong>vender más y destacar frente a la competencia.</strong>
        </p>
      </div>
    </div>
  );
}

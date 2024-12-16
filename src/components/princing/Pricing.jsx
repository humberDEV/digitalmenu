"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const pricing = [
  {
    title: "Básico",
    originalPrice: "10,90€",
    price: "8,90€",
    discount: "-15% off",
    features: [
      "Menú en blanco y negro",
      "1 idioma",
      "Logo de la empresa",
      "Información de contacto",
      "Enlace a apps de delivery",
    ],
    unavailableFeatures: [
      "Hasta 5 idiomas",
      "Personalización de colores e imágenes",
      "Soporte prioritario",
      "Reportes avanzados",
    ],
    paymentLink: "https://buy.stripe.com/test_XXXXXXX", // Enlace de pago de Stripe para el plan Básico
  },
  {
    title: "Personalizado",
    originalPrice: "18,90€",
    price: "14,90€",
    discount: "-15% off",
    features: [
      "Todo lo incluido en el Básico",
      "Personalización de colores e imágenes",
      "Hasta 5 idiomas",
      "Soporte prioritario",
      "Reportes avanzados",
    ],
    paymentLink: "https://buy.stripe.com/test_YYYYYYY", // Enlace de pago de Stripe para el plan Personalizado
  },
];

const anualPricing = [
  {
    title: "Básico",
    originalPrice: "130,80€",
    price: "79,00€",
    discount: "-40% off",
    features: [
      "Menú en blanco y negro",
      "1 idioma",
      "Logo de la empresa",
      "Información de contacto",
      "Enlace a apps de delivery",
    ],
    unavailableFeatures: [
      "Hasta 5 idiomas",
      "Personalización de colores e imágenes",
      "Soporte prioritario",
      "Reportes avanzados",
    ],
    paymentLink: "https://buy.stripe.com/test_ZZZZZZZ", // Enlace de pago de Stripe para el plan Básico anual
  },
  {
    title: "Personalizado",
    originalPrice: "226,80€",
    price: "139,00€",
    discount: "-38% off",
    features: [
      "Todo lo incluido en el Básico",
      "Personalización de colores e imágenes",
      "Hasta 5 idiomas",
      "Soporte prioritario",
      "Reportes avanzados",
    ],
    paymentLink: "https://buy.stripe.com/test_AAAAAAA", // Enlace de pago de Stripe para el plan Personalizado anual
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
    <div className="bg-light py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-dark">Planes de Precios</h2>
        <p className="text-lg mt-2 text-gray-600">
          Elige el plan que mejor se adapte a tus necesidades.
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
              className="bg-white shadow-xl border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition duration-300"
            >
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
                  <li key={i} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
                {plan.unavailableFeatures?.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-red-500 mr-2">✖</span>
                    <span className="text-gray-400 line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-primary mt-6 w-full rounded-full py-3 font-medium text-white transition"
                onClick={handleSelectPlan(plan)}
              >
                Elegir {plan.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

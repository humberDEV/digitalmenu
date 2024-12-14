"use client";

import { useState, useEffect } from "react";

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
  },
];

function CountdownTimer() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-01-31T23:59:59");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-lg font-semibold">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const currentPricing = isAnnual ? anualPricing : pricing;

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
              className="custom-card bg-white shadow-xl border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition duration-300"
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
              <button className="custom-btn mt-6 w-full rounded-full py-3 font-medium text-white transition">
                Elegir {plan.title}
              </button>
            </div>
          ))}
        </div>

        {/* Promoción con timer */}
        <div className="bg-primary text-white mt-10 py-6 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-bold">¡Oferta limitada!</h3>
          <p className="mt-2">
            Suscríbete antes del{" "}
            <span className="font-bold">31 de enero de 2025</span> y obtén{" "}
            <span className="font-bold">un mes gratis</span>.
          </p>
          <div className="mt-4">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </div>
  );
}

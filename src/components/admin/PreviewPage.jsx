import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
  FaStar,
} from "react-icons/fa";

export default function PreviewPage({ businessData }) {
  console.log("businessData", businessData);
  const primaryColor = businessData?.theme?.primaryColor || "#8B6F29";
  const backgroundColor = businessData?.theme?.backgroundColor || "#F8F1E5";
  const textColor = getBrightness(primaryColor) > 128 ? "black" : "white";

  return (
    <div
      className={`mockup-phone border-black h-[85vh] w-full relative px-6 overflow-y-hidden flex flex-col items-center ${businessData?.theme?.fontFamily?.class}`}
      style={{ backgroundColor }}
    >
      <div className="flex flex-col items-center mt-6 mb-6 w-full text-center">
        {businessData?.logoUrl && (
          <img
            src={businessData.logoUrl}
            alt="Logo"
            className="w-28 h-28 mb-4"
          />
        )}
        <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
          {businessData?.name}
        </h1>
        <p className="text-lg text-gray-700">{businessData?.subtitle}</p>
        <p className="text-md text-gray-600 mt-1">
          {businessData?.description}
        </p>
      </div>

      {/* Botones */}
      <div
        className="btn px-6 py-2 text-lg rounded-full shadow-md font-semibold"
        style={{ backgroundColor: primaryColor, color: textColor }}
      >
        Ver Menú
      </div>

      <div className="mt-4">
        <div
          className="btn px-6 py-2 rounded-full shadow-md font-semibold flex items-center gap-2"
          style={{ backgroundColor: "#FFD700", color: "#5A4500" }}
        >
          ¡Déjanos tu reseña 5 <FaStar />!
        </div>
        <p className="text-gray-700 mt-2 text-sm">
          Tu opinión nos ayuda a mejorar
        </p>
      </div>

      {/* Redes Sociales */}
      <div className="flex justify-center gap-4 mt-6">
        {businessData?.socialLinks?.instagram && (
          <a href={businessData.socialLinks.instagram} target="_blank">
            <FaInstagram className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
        {businessData?.socialLinks?.facebook && (
          <a href={businessData.socialLinks.facebook} target="_blank">
            <FaFacebook className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
        {businessData?.socialLinks?.tiktok && (
          <a href={businessData.socialLinks.tiktok} target="_blank">
            <FaTiktok className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
        {businessData?.socialLinks?.twitter && (
          <a href={businessData.socialLinks.twitter} target="_blank">
            <FaTwitter className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
      </div>

      <p className="text-gray-700 mt-2 text-sm">Síguenos en redes sociales</p>
    </div>
  );
}

function getBrightness(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

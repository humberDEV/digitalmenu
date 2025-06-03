import { color } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
  FaStar,
} from "react-icons/fa";

function getBrightness(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

const adjustBrightness = (color, amount) => {
  let usePound = false;
  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  let num = parseInt(color, 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return (
    (usePound ? "#" : "") +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
};

export default function PreviewPage({ businessData }) {
  console.log("businessData", businessData);
  const primaryColor = businessData?.theme?.textColor || "#8B6F29";
  const backgroundColor = businessData?.theme?.backgroundColor || "#F8F1E5";
  const textColor = getBrightness(primaryColor) > 128 ? "black" : "white";
  const textDescriptionsColor =
    getBrightness(backgroundColor) > 128 ? "black" : "white";
  // two tones over textColor
  const buttonReviewColor =
    textColor === "black"
      ? adjustBrightness("#000000", 80)
      : adjustBrightness("#FFFFFF", -80);

  return (
    <div
      className={`mockup-phone border-black h-[85vh] w-full relative px-6 overflow-y-hidden flex flex-col items-center justify-center rounded-2xl ${businessData?.theme?.fontFamily?.class}`}
      style={{ backgroundColor: backgroundColor, color: textColor }}
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
        <p className="text-lg" style={{ color: textDescriptionsColor }}>
          {businessData?.subtitle}
        </p>
        <p className="text-md mt-1">{businessData?.description}</p>
      </div>

      {/* Botones */}
      <div
        className="btn px-6 py-2 text-lg rounded-full shadow-md font-semibold"
        style={{ backgroundColor: primaryColor, color: textColor }}
      >
        Ver Menú
      </div>

      {businessData?.showReviewButton && (
        <div className="mt-4">
          <div
            className="btn px-6 py-2 rounded-full shadow-md font-semibold flex items-center gap-2"
            style={{
              backgroundColor: buttonReviewColor,
              color: textDescriptionsColor,
            }}
          >
            ¡Déjanos tu reseña 5 <FaStar />!
          </div>
          <p
            className=" mt-2 text-xs text-center"
            style={{ color: textDescriptionsColor }}
          >
            Tu opinión nos ayuda a mejorar
          </p>
        </div>
      )}

      {/* Redes Sociales */}
      <div className="flex justify-center gap-4 mt-10">
        {businessData?.socialLinks?.instagram?.trim() && (
          <a href={businessData.socialLinks.instagram} target="_blank">
            <FaInstagram className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
        {businessData?.socialLinks?.facebook?.trim() && (
          <a href={businessData.socialLinks.facebook} target="_blank">
            <FaFacebook className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
        {businessData?.socialLinks?.tiktok?.trim() && (
          <a href={businessData.socialLinks.tiktok} target="_blank">
            <FaTiktok className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
        {businessData?.socialLinks?.twitter?.trim() && (
          <a href={businessData.socialLinks.twitter} target="_blank">
            <FaTwitter className="text-2xl" style={{ color: primaryColor }} />
          </a>
        )}
      </div>

      {/* only show if there is some social links */}
      {
        /* se cumple cualquiera de las condiciones */
        (businessData?.socialLinks?.instagram?.trim() ||
          businessData?.socialLinks?.facebook?.trim() ||
          businessData?.socialLinks?.tiktok?.trim() ||
          businessData?.socialLinks?.twitter?.trim()) && (
          /* se pinta el texto */
          <p className="mt-2 text-sm" style={{ color: textDescriptionsColor }}>
            Síguenos en redes sociales
          </p>
        )
      }
    </div>
  );
}

import { color } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
  FaStar,
  FaPhone,
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
  const buttonCallColor =
    textColor === "black"
      ? adjustBrightness("#000000", 50)
      : adjustBrightness("#FFFFFF", -50);

  // Determine icon filter and color for delivery icons
  const iconColorForDelivery = primaryColor;

  return (
    <div
      className={`mockup-phone border-black min-h-[85vh] h-[85vh] w-full relative py-6 px-6 overflow-y-auto flex flex-col items-center justify-center rounded-2xl ${businessData?.theme?.fontFamily?.class}`}
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div className="flex flex-col items-center justify-center flex-grow pt-8 w-full">
        {/* Logo */}
        {businessData?.logoUrl && (
          <img src={businessData.logoUrl} alt="Logo" className="w-28 h-28" />
        )}

        {/* Nombre */}
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
          {businessData?.name}
        </h1>

        {/* Subtítulo */}
        <p className="text-sm" style={{ color: textDescriptionsColor }}>
          {businessData?.subtitle}
        </p>

        {/* Descripción */}
        {businessData?.description && (
          <p className="text-md mt-3">{businessData.description}</p>
        )}

        {/* Botón principal: Ver Menú */}
        <div
          className="px-4 py-2 text-md rounded-full shadow font-medium mt-4 transition-all duration-200 ease-in-out"
          style={{ backgroundColor: primaryColor, color: textColor }}
        >
          Ver Menú
        </div>

        {/* Botón de reseña (colocado debajo de Ver Menú) */}
        {businessData?.showReviewButton && (
          <div
            className="btn px-3 py-2 rounded-full shadow-md font-semibold flex items-center gap-2 mt-3 transition-all duration-200 ease-in-out text-sm"
            style={{
              backgroundColor: buttonReviewColor,
              color: textDescriptionsColor,
            }}
          >
            Déjanos tu reseña 5 <FaStar />
          </div>
        )}

        {/* Texto explicativo para llamada y botón, moved here */}
        {businessData?.phone && (
          <div className="text-center mt-4">
            <p className="text-xs" style={{ color: textDescriptionsColor }}>
              ¿Tienes dudas?
            </p>
            <a
              href={`tel:${businessData.phone}`}
              className="rounded-full px-3 py-1 shadow font-medium flex items-center gap-2 transition-all text-white mt-1 text-sm mx-auto w-max"
              style={{ backgroundColor: buttonCallColor }}
            >
              <FaPhone className="w-3 h-3" />
              Llamar
            </a>
          </div>
        )}
      </div>

      {/* Bloque inferior: redes sociales, delivery */}
      <div className="mt-auto mb-6 w-full">
        <div className="text-center space-y-4">
          {/* Texto Síguenos en redes sociales */}
          {(businessData?.socialLinks?.instagram?.trim() ||
            businessData?.socialLinks?.facebook?.trim() ||
            businessData?.socialLinks?.tiktok?.trim() ||
            businessData?.socialLinks?.twitter?.trim()) && (
            <div>
              <p className="text-sm" style={{ color: textDescriptionsColor }}>
                Síguenos en redes sociales
              </p>
              {/* Iconos de redes sociales */}
              <div className="flex justify-center gap-4 mt-1">
                {businessData?.socialLinks?.instagram?.trim() && (
                  <a
                    href={businessData.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram
                      className="w-6 h-6"
                      style={{ color: primaryColor }}
                    />
                  </a>
                )}
                {businessData?.socialLinks?.facebook?.trim() && (
                  <a
                    href={businessData.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook
                      className="w-6 h-6"
                      style={{ color: primaryColor }}
                    />
                  </a>
                )}
                {businessData?.socialLinks?.tiktok?.trim() && (
                  <a
                    href={businessData.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTiktok
                      className="w-6 h-6"
                      style={{ color: primaryColor }}
                    />
                  </a>
                )}
                {businessData?.socialLinks?.twitter?.trim() && (
                  <a
                    href={businessData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter
                      className="w-6 h-6"
                      style={{ color: primaryColor }}
                    />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Texto Pide online con + delivery icons */}
          {(businessData?.deliveryLinks?.glovo ||
            businessData?.deliveryLinks?.ubereats ||
            businessData?.deliveryLinks?.justeat ||
            businessData?.deliveryLinks?.deliveroo) && (
            <div>
              <p className="text-sm" style={{ color: textDescriptionsColor }}>
                Pide online con:
              </p>
              <div className="flex justify-center items-center gap-2 flex-wrap mt-2">
                {businessData?.deliveryLinks?.glovo && (
                  <a
                    href={businessData.deliveryLinks.glovo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Glovo"
                      src="https://raw.githubusercontent.com/simple-icons/simple-icons/e68541719dc46db7fca57c845180d006c1bfaa99/icons/glovo.svg"
                      className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                      style={{
                        color: primaryColor,
                      }}
                    />
                  </a>
                )}
                {businessData?.deliveryLinks?.ubereats && (
                  <a
                    href={businessData.deliveryLinks.ubereats}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Uber Eats"
                      src="https://raw.githubusercontent.com/simple-icons/simple-icons/e68541719dc46db7fca57c845180d006c1bfaa99/icons/ubereats.svg"
                      className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                      style={{
                        color: primaryColor,
                      }}
                    />
                  </a>
                )}
                {businessData?.deliveryLinks?.justeat && (
                  <a
                    href={businessData.deliveryLinks.justeat}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Just Eat"
                  >
                    <img
                      alt="Just Eat"
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Just_Eat_Takeaway.com_icon_logo.svg/622px-Just_Eat_Takeaway.com_icon_logo.svg.png?20220629000802"
                      className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity saturate-0 brightness-0"
                      style={{
                        color: primaryColor,
                      }}
                    />
                  </a>
                )}
                {businessData?.deliveryLinks?.deliveroo && (
                  <a
                    href={businessData.deliveryLinks.deliveroo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Deliveroo"
                      src="https://raw.githubusercontent.com/simple-icons/simple-icons/e68541719dc46db7fca57c845180d006c1bfaa99/icons/deliveroo.svg"
                      className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                      style={{
                        color: primaryColor,
                      }}
                    />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

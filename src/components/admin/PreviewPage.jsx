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

export default function PreviewPage({ businessData, slugName = "" }) {
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

  // href dynamic for see menu
  var hrefMenu = "";
  if (slugName !== "") {
    hrefMenu = `${slugName}/menu`;
  }

  console.log("hrefMenu", hrefMenu);

  return (
    <div
      className={`mockup-phone border-black min-h-[85vh] h-[85vh] w-full relative px-6 py-6 overflow-y-auto flex flex-col rounded-2xl ${businessData?.theme?.fontFamily?.class}`}
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div className="flex flex-col justify-between flex-grow w-full">
        {/* Bloque central centrado verticalmente */}
        <div className="flex-grow flex flex-col items-center justify-center gap-y-4 text-center w-full max-w-xs mx-auto">
          {businessData?.logoUrl && (
            <img
              src={businessData.logoUrl}
              alt="Logo"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}

          <h1
            className="text-2xl font-bold leading-tight"
            style={{ color: primaryColor }}
          >
            {businessData?.name}
          </h1>

          {businessData?.subtitle && (
            <p
              className="text-sm text-pretty"
              style={{ color: textDescriptionsColor }}
            >
              {businessData.subtitle}
            </p>
          )}

          {businessData?.description && (
            <p className="text-sm text-muted-foreground text-pretty max-w-screen-md px-8">
              {businessData.description}
            </p>
          )}

          <a href={hrefMenu}>
            <button
              className="px-4 py-2 rounded-full font-medium shadow transition hover:scale-[1.03]"
              style={{ backgroundColor: primaryColor, color: textColor }}
            >
              Ver Menú
            </button>
          </a>

          {businessData?.showReviewButton && (
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow transition hover:scale-[1.03]"
              style={{
                backgroundColor: buttonReviewColor,
                color: textDescriptionsColor,
              }}
            >
              Déjanos tu reseña 5 <FaStar className="w-4 h-4" />
            </button>
          )}

          {businessData?.phone && (
            <div className="text-center space-y-2">
              <p className="text-xs" style={{ color: textDescriptionsColor }}>
                ¿Tienes dudas?
              </p>
              <a
                href={`tel:${businessData.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm text-white shadow transition hover:scale-[1.03]"
                style={{ backgroundColor: buttonCallColor }}
              >
                <FaPhone className="w-4 h-4" />
                Llamar
              </a>
            </div>
          )}
        </div>

        {/* Footer fijo abajo */}
        <div className="w-full max-w-xs mx-auto space-y-4 text-center mt-10">
          {(businessData?.socialLinks?.instagram ||
            businessData?.socialLinks?.facebook ||
            businessData?.socialLinks?.tiktok ||
            businessData?.socialLinks?.twitter) && (
            <>
              <p className="text-sm" style={{ color: textDescriptionsColor }}>
                Síguenos en redes sociales
              </p>
              <div className="flex justify-center gap-4">
                {businessData?.socialLinks?.instagram && (
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
                {businessData?.socialLinks?.facebook && (
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
                {businessData?.socialLinks?.tiktok && (
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
                {businessData?.socialLinks?.twitter && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

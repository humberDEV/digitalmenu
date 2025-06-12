"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";

export default function QrPage() {
  // Inicialización del estado qrConfig con valores de localStorage o por defecto
  const [qrConfig, setQrConfig] = useState(() => {
    const saved = localStorage.getItem("qrConfig");
    if (saved) {
      return JSON.parse(saved);
    } else {
      const email = localStorage.getItem("email") || "ejemplo@correo.com";
      const userSlug = email.split("@")[0];
      return {
        slug: userSlug,
        url: `${window.location.origin}/${userSlug}`,
        colorBg: "#ffffff",
        colorFg: "#000000",
        label: "",
        includeMenuLink: true,
        includeWebLink: true,
      };
    }
  });

  // Actualiza la url cuando cambia el slug
  useEffect(() => {
    setQrConfig((prev) => ({
      ...prev,
      url: `${window.location.origin}/${prev.slug}`,
    }));
  }, [qrConfig.slug]);

  // Guarda qrConfig en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("qrConfig", JSON.stringify(qrConfig));
  }, [qrConfig]);

  // Función para actualizar campos individuales de qrConfig
  const updateConfig = (field, value) => {
    setQrConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Función para descargar un QR dado el id y el nombre de archivo
  const handleDownload = (id, filename) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Función para abrir ventana imprimible con los QR activos
  const handlePrint = () => {
    const printWindow = window.open("", "PrintQR", "width=800,height=600");
    if (!printWindow) return;

    // Construir el contenido HTML para imprimir
    const { slug, colorBg, colorFg, label, includeMenuLink, includeWebLink } =
      qrConfig;
    const origin = window.location.origin;

    const qrs = [];
    if (includeWebLink) {
      qrs.push({
        id: "print-web-qr",
        url: `${origin}/${slug}`,
        label,
      });
    }
    if (includeMenuLink) {
      qrs.push({
        id: "print-menu-qr",
        url: `${origin}/${slug}/menu`,
        label,
      });
    }

    // HTML para imprimir, incluye estilos mínimos para centrar y separar QR
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Códigos QR</title>
          <style>
            body {
              font-family: sans-serif;
              padding: 20px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 40px;
              background: white;
              color: black;
            }
            .qr-card {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-bottom: 20px;
            }
            .qr-label {
              margin-top: 10px;
              font-size: 1.1rem;
              text-align: center;
            }
            canvas {
              background-color: ${colorBg};
              border: 1px solid #ccc;
            }
          </style>
        </head>
        <body>
          ${qrs
            .map((qr) => `<div class="qr-card" id="${qr.id}-container"></div>`)
            .join("")}
          <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
          <script>
            const colorBg = "${colorBg}";
            const colorFg = "${colorFg}";
            const qrs = ${JSON.stringify(qrs)};
            qrs.forEach(({id, url, label}) => {
              const container = document.getElementById(id + "-container");
              const canvas = document.createElement("canvas");
              container.appendChild(canvas);
              QRCode.toCanvas(canvas, url, {
                color: {
                  dark: colorFg,
                  light: colorBg,
                },
                margin: 2,
                width: 256,
              });
              const labelEl = document.createElement("div");
              labelEl.textContent = label;
              labelEl.className = "qr-label";
              container.appendChild(labelEl);
            });
            window.onload = () => { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-8 bg-navy min-h-dvh text-white flex flex-col lg:flex-row gap-12 items-start">
      {/* Sección de vista previa central */}
      <section className="flex-1 flex flex-col items-center justify-center">
        {qrConfig.includeWebLink || qrConfig.includeMenuLink ? (
          <div className="bg-white p-6 rounded-xl shadow-md w-fit mx-auto">
            <QRCodeCanvas
              id="qr-preview"
              value={
                qrConfig.includeMenuLink
                  ? `${window.location.origin}/${qrConfig.slug}/menu`
                  : `${window.location.origin}/${qrConfig.slug}`
              }
              size={256}
              bgColor={qrConfig.colorBg}
              fgColor={qrConfig.colorFg}
              includeMargin={true}
            />
            <p className="text-black text-center mt-3">{qrConfig.label}</p>
            <div className="mt-4 flex gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  handleDownload("qr-preview", `${qrConfig.slug}_qr.png`)
                }
              >
                Descargar PNG
              </Button>
              <Button variant="secondary" onClick={handlePrint}>
                Imprimir en A4
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center w-full">
            Selecciona al menos un tipo de enlace para mostrar los códigos QR.
          </p>
        )}
      </section>

      {/* Sección de inputs - panel lateral derecho */}
      <section className="w-full lg:max-w-sm bg-card/30 border border-white/10 rounded-xl p-6 shadow-md backdrop-blur-md flex flex-col gap-6">
        <h1 className="text-3xl font-semibold mb-4">Editor QR Completo</h1>

        {/* Select para elegir tipo de exportación */}
        <div>
          <label htmlFor="exportType" className="block mb-1 font-medium">
            Qué deseas exportar
          </label>
          <select
            id="exportType"
            value={
              qrConfig.includeMenuLink
                ? "menu"
                : qrConfig.includeWebLink
                ? "web"
                : "none"
            }
            onChange={(e) => {
              const val = e.target.value;
              updateConfig("includeWebLink", val === "web");
              updateConfig("includeMenuLink", val === "menu");
            }}
            className="input input-bordered bg-white text-black w-full"
          >
            <option value="web">Página web</option>
            <option value="menu">Menú digital</option>
          </select>
        </div>

        {/* Input para label */}
        <div>
          <label
            htmlFor="label"
            className="text-sm text-muted-foreground mb-1 font-medium"
          >
            Texto debajo del QR
          </label>
          <input
            id="label"
            type="text"
            value={qrConfig.label}
            onChange={(e) => updateConfig("label", e.target.value)}
            className="input input-bordered bg-white text-black w-full"
            placeholder="Ejemplo: Menú digital"
          />
        </div>

        {/* Color de fondo */}
        <div>
          <label htmlFor="colorBg" className="block mb-1 font-medium">
            Color de fondo
          </label>
          <input
            id="colorBg"
            type="color"
            value={qrConfig.colorBg}
            onChange={(e) => updateConfig("colorBg", e.target.value)}
            className="w-16 h-10 p-0 border-0 cursor-pointer"
          />
        </div>

        {/* Color de primer plano */}
        <div>
          <label htmlFor="colorFg" className="block mb-1 font-medium">
            Color del QR
          </label>
          <input
            id="colorFg"
            type="color"
            value={qrConfig.colorFg}
            onChange={(e) => updateConfig("colorFg", e.target.value)}
            className="w-16 h-10 p-0 border-0 cursor-pointer"
          />
        </div>

        {/* Eliminados los checkboxes para evitar conflicto visual o funcional */}
      </section>
    </div>
  );
}

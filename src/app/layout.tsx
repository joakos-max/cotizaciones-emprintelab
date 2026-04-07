import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emprinte Lab | Generador de Cotizaciones",
  description: "Herramienta premium para generar cotizaciones de impresión UV cama plana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

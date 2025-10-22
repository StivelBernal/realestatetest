import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { LoaderProvider } from "../contexts";
import GlobalLoader from "../components/ui/GlobalLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate Colombia | Propiedades en Venta y Alquiler",
  description: "Encuentra la propiedad perfecta en Colombia. Explora casas, apartamentos y oficinas en venta y alquiler en las mejores ubicaciones del país.",
  keywords: "real estate, propiedades, inmuebles, Colombia, casas, apartamentos, venta, alquiler, bienes raíces",
  openGraph: {
    title: "Real Estate Colombia | Propiedades en Venta y Alquiler",
    description: "Encuentra la propiedad perfecta en Colombia. Casas, apartamentos y oficinas en las mejores ubicaciones.",
    type: "website",
    locale: "es_CO",
    siteName: "Real Estate Colombia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Colombia | Propiedades en Venta y Alquiler",
    description: "Encuentra la propiedad perfecta en Colombia. Casas, apartamentos y oficinas en las mejores ubicaciones.",
  },
  robots: "index, follow",
  authors: [{ name: "Real Estate Colombia" }],
  viewport: "width=device-width, initial-scale=1",
  category: "Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LoaderProvider>
          <GlobalLoader />
          {children}
        </LoaderProvider>
      </body>
    </html>
  );
}

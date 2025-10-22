import { Header } from "../../components/layout/Header";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio | Real Estate Colombia - Tu Hogar Ideal Te Espera',
  description: 'Bienvenido a Real Estate Colombia. Descubre las mejores propiedades en las ubicaciones más exclusivas. Encuentra tu hogar ideal con propiedades verificadas y precios competitivos.',
  robots: 'index, follow',
  authors: [{ name: 'Real Estate Colombia' }]
};

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Header />
      {children}
    </main>
  );
}

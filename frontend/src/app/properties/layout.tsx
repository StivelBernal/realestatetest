import { Header } from "../../components/layout/Header";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Propiedades Disponibles | Real Estate Colombia',
  description: 'Explora nuestra amplia selección de propiedades en venta y alquiler en Colombia. Encuentra casas, apartamentos y oficinas en las mejores ubicaciones.',
  robots: 'index, follow',
  authors: [{ name: 'Real Estate Colombia' }]
};


export default function PropertiesPagesLayout({
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

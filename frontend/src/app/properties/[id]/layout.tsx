import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detalles de Propiedad | Real Estate Colombia',
  description: 'Conoce todos los detalles de esta propiedad. Fotos, ubicación, características y más información para tomar la mejor decisión.',
  robots: 'index, follow',
  authors: [{ name: 'Real Estate Colombia' }],
};

export default function PropertyDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
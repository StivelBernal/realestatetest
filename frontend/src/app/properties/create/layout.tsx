import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Nueva Propiedad | Real Estate Colombia',
  description: 'Publica tu propiedad gratis en Real Estate Colombia. Llega a miles de compradores potenciales y vende o arrienda más rápido.',
  robots: 'index, follow',
  authors: [{ name: 'Real Estate Colombia' }],
};

export default function CreatePropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
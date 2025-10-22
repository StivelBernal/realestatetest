'use client';

import { Property } from '@/types/property';
import dynamic from 'next/dynamic';

// Importamos dinámicamente los componentes de react-leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

// Importamos dinámicamente el PriceMarker personalizado
const PriceMarker = dynamic(
  () => import('./PriceMarker'),
  { ssr: false }
);

interface PropertiesMapProps {
  properties: Property[];
}

export default function PropertiesMap({ properties }: PropertiesMapProps) {
  // Calculate center based on properties or use a default
  const center = properties.length > 0
    ? [properties[0].lat, properties[0].lng]
    : [4.570868, -74.297333]; // Default center

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={6}
      className="h-[calc(70vh-4rem)] w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map((property) => (
        <PriceMarker
          key={property.id}
          property={property}
        />
      ))}
    </MapContainer>
  );
}
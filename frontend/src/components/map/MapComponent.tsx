'use client';

import { Property } from '@/types/property';
import { MapContainer, TileLayer } from 'react-leaflet';
import PriceMarker from './PriceMarker';

interface MapComponentProps {
  properties: Property[];
}

export default function MapComponent({ properties }: MapComponentProps) {
  const center = properties.length > 0
    ? [properties[0].lat, properties[0].lng]
    : [4.570868, -74.297333];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={13}
      className="h-[calc(100vh-4rem)] w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map((property) => (
        <PriceMarker key={property.id} property={property} />
      ))}
    </MapContainer>
  );
}
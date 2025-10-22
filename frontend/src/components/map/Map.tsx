'use client';

import { Property } from '@/types/property';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  properties: Property[];
}

const icon = new Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function Map({ properties }: MapProps) {
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
        <Marker
          key={property.id}
          position={[property.lat, property.lng]}
          icon={icon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{property.name}</h3>
              <p>{property.address}</p>
              <p className="font-semibold text-blue-600">
                ${property.price.toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
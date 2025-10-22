'use client';

import { Marker, Popup } from 'react-leaflet';
import { DivIcon, point } from 'leaflet';
import { Property } from '@/types/property';
import Link from 'next/link';
import Image from 'next/image';

interface PriceMarkerProps {
  property: Property;
}

export default function PriceMarker({ property }: PriceMarkerProps) {
  // Formatear el precio en pesos colombianos
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(0)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  // Crear un div icon personalizado para mostrar el precio
  const priceIcon = new DivIcon({
    className: 'custom-price-marker',
    html: `<div class="price-bubble">${formatPrice(property.price)}</div>`,
    iconSize: point(80, 30),
    iconAnchor: point(40, 15)
  });

  return (
    <Marker
      position={[property.lat, property.lng]}
      icon={priceIcon}
    >
      <Popup className="property-popup">
        <Link href={`/properties/${property.id}`} className="block">
          <div className="w-64">
            <div className="relative h-40 mb-2">
              <Image
                src={property.image || '/default-image.webp'}
                alt={property.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="property-popup-info space-y-1">
              <h3 className="font-semibold text-lg">{property.name}</h3>
              <p className="text-gray-600 text-sm">{property.address}</p>
              <p className="text-xl font-bold text-blue-600">
                ${property.price.toLocaleString('es-CO')} COP
              </p>
            </div>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}
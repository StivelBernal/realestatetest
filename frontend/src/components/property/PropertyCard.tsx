import { Property } from '@/types/property';
import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Props para el componente PropertyCard.
 */
interface PropertyCardProps {
  /**
   * Objeto de propiedad que contiene toda la información a mostrar.
   */
  property: Property;
}

/**
 * Componente PropertyCard para mostrar información de una propiedad en formato tarjeta.
 * 
 * Muestra una tarjeta clicable con la imagen de la propiedad, nombre,
 * dirección y precio formateado. Incluye manejo de errores de imagen
 * con fallback a imagen por defecto y efectos hover para mejorar la UX.
 * 
 * @param props - Props del componente PropertyCard
 * 
 * @example
 * ```tsx
 * // En una lista de propiedades
 * {properties.map((property) => (
 *   <PropertyCard key={property.id} property={property} />
 * ))}
 * 
 * // En una grilla
 * <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   <PropertyCard property={selectedProperty} />
 * </div>
 * ```
 * 
 * @returns Elemento JSX de la tarjeta de propiedad
 */
export default function PropertyCard({ property }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={imageError || !property.image ? '/default-image.webp' : property.image}
            alt={property.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{property.address}</p>
          <p className="text-lg font-bold text-blue-600 mt-2">
            {formatCurrency(property.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
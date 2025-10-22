'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/types/property';
import propertyService from '@/services/propertyService';
import Image from 'next/image';
import Link from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import dynamic from 'next/dynamic';

// Import PropertyMap component dynamically to avoid SSR issues
const PropertyMap = dynamic(
  () => import('../../../components/map/PropertyMap'),
  { ssr: false }
);

interface PropertyDetailProps {
  params: {
    id: string;
  };
}

export default function PropertyDetailPage({ params }: PropertyDetailProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await propertyService.getById(params.id);
        console.log({ data })
        setProperty(data);
      } catch (error) {
        console.error('Error loading property:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando detalles de la propiedad...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h1>
          <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar la propiedad que buscas.</p>
          <Link 
            href="/properties" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Volver a Propiedades
          </Link>
        </div>
      </div>
    );
  }

  // Generate sample images for gallery (since mock data might not have multiple images)

  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [
        !property.image ? '/default-image.webp' : property.image
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/properties" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Propiedades
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Splide
                options={{
                  type: 'fade',
                  rewind: true,
                  pagination: true,
                  arrows: true,
                  cover: true,
                  height: '400px',
                  gap: '1rem',
                }}
                className="property-gallery"
              >
                {galleryImages.map((image, index) => (
                  <SplideSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${property.name} - Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>

            {/* Property Title and Basic Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{property.name}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{property.address}</span>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                ${property.price.toLocaleString('es-CO')} COP
              </div>
            </div>

            {/* TODO: Mejora agregar descripción por ahora quemado */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Esta moderna casa ofrece una perfecta combinación de estilo y funcionalidad. Con espacios de concepto abierto, 
                cocina gourmet y suite principal de lujo, está diseñada para una vida cómoda y el entretenimiento. La propiedad también cuenta con 
                un hermoso jardín con área de patio ideal para reuniones al aire libre.
              </p>
            </div>

            {/* TODO: Mejora agregar features por ahora quemadas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Características</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Habitaciones</span>
                  <span className="text-gray-600">4</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Baños</span>
                  <span className="text-gray-600">3</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Área Total</span>
                  <span className="text-gray-600">2,500 sq ft</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Área del Lote</span>
                  <span className="text-gray-600">0.25 acres</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Año de Construcción</span>
                  <span className="text-gray-600">2019</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Tipo</span>
                  <span className="text-gray-600">Casa Familiar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact and Map */}
          <div className="space-y-6">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Contactar</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Mensaje (opcional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Enviar Consulta
                </button>
              </form>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ubicación</h3>
              </div>
              <PropertyMap lat={property.lat} lng={property.lng} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import FilterForm from '../../components/property/FilterForm';
import PropertyCard from '../../components/property/PropertyCard';
import PropertiesMap from '../../components/map/PropertiesMap';
import { useLoader } from './../../contexts';
import { Property, PropertyFilters } from './../../types/property';
import propertyService from './../../services/propertyService';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ViewToggle from '@/components/ui/ViewToggle';

/**
 * Página de listado de propiedades (PropertiesPage).
 * 
 * Muestra una lista filtrable de propiedades disponibles con opciones
 * de visualización en grilla o mapa. Incluye un sidebar con filtros
 * de búsqueda y estadísticas de resultados.
 * 
 * Características principales:
 * - Filtrado por criterios múltiples (nombre, dirección, precio)
 * - Alternancia entre vista de grilla y mapa
 * - Estados de carga y vacío
 * - Navegación a detalles de propiedad
 * - Responsive design
 * 
 * @example
 * Ruta: `/properties`
 * Esta página se accede desde el menú principal o CTA de la homepage.
 * 
 * @returns Elemento JSX de la página de propiedades
 */
export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const { showLoader, hideLoader } = useLoader();

  const loadProperties = async (filters?: PropertyFilters) => {
    try {
      setLoading(true);
      showLoader(filters ? 'Aplicando filtros...' : 'Cargando propiedades...');
      const data = await propertyService.getAll(filters);
      console.log(data, 'Loaded properties');
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    loadProperties();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Propiedades Disponibles</h1>
          <p className="text-lg text-gray-600">Encuentra la propiedad perfecta para ti</p>
        </div>

        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <FilterForm onSubmit={loadProperties} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats and View Toggle */}
            <div className="mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{properties.length}</span> propiedades encontradas
              </div>
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>

            {/* Content */}
            {loading ? (
              <LoadingSpinner message="Cargando propiedades..." />
            ) : properties.length === 0 ? (
              <EmptyState
                title="No se encontraron propiedades"
                description="Ajusta tus filtros o explora otras opciones"
                actionLabel="Crear Primera Propiedad"
                actionHref="/properties/create"
              />
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="h-[calc(70vh-12rem)] rounded-lg overflow-hidden shadow-lg">
                <PropertiesMap properties={properties} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
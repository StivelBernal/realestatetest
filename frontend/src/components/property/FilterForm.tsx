import { useForm } from 'react-hook-form';
import { PropertyFilters } from '@/types/property';

/**
 * Props para el componente FilterForm.
 */
interface FilterFormProps {
  /**
   * Función callback que se ejecuta cuando se envía el formulario de filtros.
   * @param filters - Objeto con los filtros aplicados
   */
  onSubmit: (filters: PropertyFilters) => void;
}

/**
 * Interfaz para los datos internos del formulario de filtros.
 */
interface FormData {
  /** Filtro por nombre de propiedad */
  name?: string;
  /** Filtro por dirección */
  address?: string;
  /** Precio mínimo */
  minPrice?: number;
  /** Precio máximo */
  maxPrice?: number;
}

/**
 * Componente FilterForm para filtrar propiedades por criterios múltiples.
 * 
 * Proporciona un formulario con campos para filtrar propiedades por nombre,
 * dirección y rango de precios. Incluye validación y botones para aplicar
 * o limpiar filtros.
 * 
 * @param props - Props del componente FilterForm
 * 
 * @example
 * ```tsx
 * <FilterForm 
 *   onSubmit={(filters) => handleFilterChange(filters)} 
 * />
 * ```
 * 
 * @returns Elemento JSX del formulario de filtros
 */
export default function FilterForm({ onSubmit }: FilterFormProps) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    // Filter out empty values
    const filters = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== '' && value !== null && value !== undefined)
    );
    onSubmit(filters);
  };

  const handleReset = () => {
    reset();
    onSubmit({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-4">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-800">Filtros de Búsqueda</h2>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Propiedad
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Buscar por nombre..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                id="address"
                {...register('address')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Buscar por dirección..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de Precio
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  {...register('minPrice', { valueAsNumber: true })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Mín"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  {...register('maxPrice', { valueAsNumber: true })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Máx"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Aplicar Filtros
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Limpiar Filtros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
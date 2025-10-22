import clsx from 'clsx';

/**
 * Props para el componente ViewToggle.
 */
interface ViewToggleProps {
  /**
   * Modo de vista actual seleccionado.
   */
  viewMode: 'grid' | 'map';
  
  /**
   * Función callback que se ejecuta cuando el usuario cambia el modo de vista.
   * @param mode - El nuevo modo de vista seleccionado
   */
  onViewModeChange: (mode: 'grid' | 'map') => void;
}

/**
 * Componente ViewToggle para alternar entre vista de grilla y mapa.
 * 
 * Proporciona dos botones que permiten al usuario cambiar entre
 * visualización en grilla y en mapa. El botón activo se resalta
 * con un estilo diferente.
 * 
 * @param props - Props del componente ViewToggle
 * 
 * @example
 * ```tsx
 * const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
 * 
 * <ViewToggle 
 *   viewMode={viewMode} 
 *   onViewModeChange={setViewMode} 
 * />
 * ```
 * 
 * @returns Elemento JSX con los botones de alternancia de vista
 */
export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewModeChange('grid')}
        className={clsx(
          'px-4 py-2 rounded-lg font-medium transition-colors',
          viewMode === 'grid'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-300'
        )}
      >
        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Grid
      </button>
      <button
        onClick={() => onViewModeChange('map')}
        className={clsx(
          'px-4 py-2 rounded-lg font-medium transition-colors',
          viewMode === 'map'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-300'
        )}
      >
        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Mapa
      </button>
    </div>
  );
}
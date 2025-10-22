/**
 * Props para el componente LoadingSpinner.
 */
interface LoadingSpinnerProps {
  /**
   * Mensaje que se muestra junto al spinner.
   */
  message?: string;
  
  /**
   * Tamaño del spinner que afecta tanto el ícono como el contenedor.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Componente LoadingSpinner para indicar estados de carga.
 * 
 * Muestra un spinner animado con un mensaje personalizable.
 * Útil para indicar al usuario que una operación está en progreso,
 * como la carga de datos o el procesamiento de una acción.
 */
export default function LoadingSpinner({ message = 'Cargando...', size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8'
  };

  const containerPadding = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-20'
  };

  return (
    <div className={`text-center ${containerPadding[size]}`}>
      <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white">
        <svg 
          className={`animate-spin -ml-1 mr-3 ${sizeClasses[size]} text-gray-500`} 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {message}
      </div>
    </div>
  );
}
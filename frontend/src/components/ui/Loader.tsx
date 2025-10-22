import { ReactNode } from 'react';

interface LoaderProps {
  /** Mensaje que se muestra debajo del spinner */
  message?: string;
  /** Tamaño del spinner */
  size?: 'sm' | 'md' | 'lg';
  show?: boolean;
  /** Contenido adicional para mostrar debajo del mensaje */
  children?: ReactNode;
}

/**
 * Componente Loader que cubre toda la pantalla con un overlay.
 * Muestra un spinner animado con mensaje opcional
 * @param props - Props del componente Loader
 * ```
 */
export default function Loader({ 
  message = 'Cargando...', 
  size = 'md', 
  show = true,
  children 
}: LoaderProps) {
  if (!show) return null;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4 text-center">
        {/* Spinner */}
        <div className={`${sizeClasses[size]} mx-auto mb-4 animate-spin`}>
          <svg 
            className="w-full h-full text-blue-600" 
            fill="none" 
            stroke="currentColor" 
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
        </div>

        {/* Mensaje */}
        <p className={`${textSizeClasses[size]} font-medium text-gray-800 mb-2`}>
          {message}
        </p>

        {/* Contenido adicional */}
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}

        {/* Puntos animados para indicar progreso */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Props para el componente Button.
 * Extiende ButtonHTMLAttributes para incluir todas las propiedades nativas de un botón HTML.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual del botón que determina su apariencia.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * Tamaño del botón que afecta el padding y el texto.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Indica si el botón está en estado de carga, mostrando un spinner.
   * Cuando es true, el botón se deshabilita automáticamente.
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Contenido del botón (texto, íconos, otros elementos).
   */
  children: ReactNode;
}

/**
 * Componente Button reutilizable con múltiples variantes y estados.
 * 
 * Proporciona un botón personalizable con diferentes estilos visuales,
 * tamaños y estados como loading. Incluye accesibilidad completa y
 * todas las propiedades estándar de un botón HTML.
 * 
 * @component
 * @group Componentes UI
 * @param props - Props del componente Button
 * 
 * @example
 * ```tsx
 * // Botón básico
 * <Button>Guardar</Button>
 * 
 * // Botón con variante y tamaño
 * <Button variant="outline" size="lg">Cancelar</Button>
 * 
 * // Botón en estado de carga
 * <Button isLoading>Procesando...</Button>
 * 
 * // Botón con evento onClick
 * <Button onClick={() => console.log('clicked')}>Click me</Button>
 * ```
 * 
 * @returns Elemento JSX del botón
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
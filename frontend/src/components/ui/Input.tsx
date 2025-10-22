import { forwardRef, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * Props para el componente Input.
 * Extiende InputHTMLAttributes para incluir todas las propiedades nativas de un input HTML.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Etiqueta que se muestra encima del campo de entrada.
   * Si no se proporciona, no se renderiza la etiqueta.
   */
  label?: string;
  
  /**
   * Mensaje de error que se muestra debajo del campo.
   * Cuando está presente, el input cambia a estado de error con estilos rojos.
   */
  error?: string;
  
  /**
   * Objeto de registro de React Hook Form que conecta el input con el formulario.
   * Incluye validaciones, valores y manejo de eventos automático.
   */
  registration?: UseFormRegisterReturn;
}

/**
 * Componente Input reutilizable con soporte para formularios y validaciones.
 * 
 * Proporciona un campo de entrada personalizable que se integra perfectamente
 * con React Hook Form. Incluye estados de error, etiquetas automáticas y
 * estilos consistentes con el sistema de diseño.
 * 
 * @param props - Props del componente Input
 * @param ref - Referencia al elemento input HTML
 * @returns Elemento JSX del input con etiqueta y mensaje de error
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, registration, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...registration}
          {...props}
          className={`
            w-full px-3 py-2 
            bg-white border border-gray-300 rounded-md shadow-sm
            text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500 bg-red-50' : 'bg-white border-gray-300'}
            ${className}
          `.replace(/\s+/g, ' ').trim()}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
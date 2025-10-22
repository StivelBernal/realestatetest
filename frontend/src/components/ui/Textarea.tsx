import { forwardRef, TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * Props para el componente Textarea.
 * Extiende TextareaHTMLAttributes para incluir todas las propiedades nativas de un textarea HTML.
 */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Etiqueta que se muestra encima del área de texto.
   * Si no se proporciona, no se renderiza la etiqueta.
   */
  label?: string;
  
  /**
   * Mensaje de error que se muestra debajo del campo.
   * Cuando está presente, el textarea cambia a estado de error con estilos rojos.
   */
  error?: string;
  
  /**
   * Objeto de registro de React Hook Form que conecta el textarea con el formulario.
   * Incluye validaciones, valores y manejo de eventos automático.
   */
  registration?: UseFormRegisterReturn;
}

/**
 * Componente Textarea reutilizable para entrada de texto multilínea.
 * 
 * Proporciona un área de texto personalizable que se integra perfectamente
 * con React Hook Form. Incluye estados de error, etiquetas automáticas,
 * redimensionamiento vertical y estilos consistentes.
 * 
 * @param props - Props del componente Textarea
 * @param ref - Referencia al elemento textarea HTML
 * @returns Elemento JSX del textarea con etiqueta y mensaje de error
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, registration, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...registration}
          {...props}
          rows={4}
          className={`
            w-full px-3 py-2 
            bg-white border border-gray-300 rounded-md shadow-sm
            text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 disabled:cursor-not-allowed 
            resize-vertical
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

Textarea.displayName = 'Textarea';

export default Textarea;
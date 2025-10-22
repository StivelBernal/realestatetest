import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * Props para el componente FileInput.
 * Extiende InputHTMLAttributes excluyendo 'type' ya que siempre es 'file'.
 */
interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Etiqueta que se muestra encima del campo de subida.
   * Si no se proporciona, no se renderiza la etiqueta.
   */
  label?: string;
  
  /**
   * Mensaje de error que se muestra debajo del campo.
   * Cuando está presente, el componente cambia a estado de error con estilos rojos.
   */
  error?: string;
  
  /**
   * Objeto de registro de React Hook Form que conecta el input con el formulario.
   * Incluye validaciones, valores y manejo de eventos automático.
   */
  registration?: UseFormRegisterReturn;
  
  /**
   * Permite seleccionar múltiples archivos a la vez.
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Tipos de archivo permitidos (mime types).
   * @default 'image/*'
   */
  accept?: string;
  
  /**
   * Muestra una vista previa de las imágenes seleccionadas.
   * @default true
   */
  preview?: boolean;
}

/**
 * Componente FileInput para subida de archivos con vista previa.
 * 
 * Proporciona una interfaz de arrastrar y soltar para subir archivos,
 * con vista previa automática de imágenes, soporte para múltiples archivos
 * y integración completa con React Hook Form.
 * 
 * @param props - Props del componente FileInput
 * @param ref - Referencia al elemento input HTML
 * @returns Elemento JSX del input de archivos con área de arrastrar y vista previa
 */
const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, registration, multiple = false, accept = 'image/*', preview = true, ...props }, ref) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      
      if (preview && files.length > 0) {
        // Limpiar URLs anteriores para evitar memory leaks
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        
        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
      }

      // Llamar al onChange del register si existe
      if (registration?.onChange) {
        registration.onChange(e);
      }
    };

    const removePreview = (indexToRemove: number) => {
      const urlToRevoke = previewUrls[indexToRemove];
      URL.revokeObjectURL(urlToRevoke);
      setPreviewUrls(prev => prev.filter((_, i) => i !== indexToRemove));
      
      // También necesitamos actualizar el input file
      const input = ref as React.MutableRefObject<HTMLInputElement>;
      if (input?.current) {
        const dt = new DataTransfer();
        const files = Array.from(input.current.files || []);
        files.forEach((file, index) => {
          if (index !== indexToRemove) {
            dt.items.add(file);
          }
        });
        input.current.files = dt.files;
      }
    };

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className={`
          relative border-2 border-dashed rounded-lg p-6 text-center
          bg-white hover:bg-gray-50 transition-colors
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
        `}>
          <input
            ref={ref}
            type="file"
            multiple={multiple}
            accept={accept}
            {...registration}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            {...props}
          />
          
          <div className="space-y-2">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Subir {multiple ? 'archivos' : 'archivo'}
              </span>
              {' o arrastra y suelta aquí'}
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, JPEG hasta 10MB {multiple ? '(múltiples archivos permitidos)' : ''}
            </p>
          </div>
        </div>

        {preview && previewUrls.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">
                {multiple ? `${previewUrls.length} archivo(s) seleccionado(s)` : 'Vista previa'}
              </p>
              {multiple && (
                <button
                  type="button"
                  onClick={() => {
                    previewUrls.forEach(url => URL.revokeObjectURL(url));
                    setPreviewUrls([]);
                    // Limpiar el input
                    const input = ref as React.MutableRefObject<HTMLInputElement>;
                    if (input?.current) {
                      input.current.value = '';
                    }
                  }}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Limpiar todo
                </button>
              )}
            </div>
            <div className={`grid gap-4 ${multiple ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 max-w-xs'}`}>
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className={`w-full object-cover rounded-lg border border-gray-300 ${
                      multiple ? 'h-20' : 'h-32'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removePreview(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-lg"
                  >
                    ×
                  </button>
                  {multiple && (
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                      {index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export default FileInput;
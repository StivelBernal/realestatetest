'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, FileInput } from '@/components/ui';
import propertyService from '@/services/propertyService';
import { CreatePropertyFormData } from '@/types/property';
import { useLoader } from './../../../contexts';

/**
 * Página de creación de propiedades (CreatePropertyPage).
 * 
 * Proporciona un formulario completo para crear nuevas propiedades
 * incluyendo información básica, ubicación geográfica y carga de imágenes.
 * Maneja la validación, envío y redirección automática tras el éxito.
 * 
 * Funcionalidades incluidas:
 * - Formulario con validación en tiempo real
 * - Carga de imagen principal y galería
 * - Manejo de estados de carga y errores
 * - Redirección automática tras éxito
 * 
 * @example
 * Ruta: `/properties/create`
 * Accesible desde el header o botones CTA.
 * 
 * @returns Elemento JSX de la página de creación
 */
export default function CreatePropertyPage() {
  const router = useRouter();
  const { showLoader, hideLoader, isLoading } = useLoader();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePropertyFormData>({
    defaultValues: {
      idOwner: '',
      name: '',
      address: '',
      price: 0,
      lat: 0,
      lng: 0,
    }
  });

  const onSubmit = async (data: CreatePropertyFormData) => {
    showLoader('Creando propiedad...');
    setError(null);

    try {
      // Crear la propiedad básica
      const newProperty = await propertyService.create(data);

      // Subir imagen de portada si existe
      if (data.image && data.image.length > 0) {
        showLoader('Subiendo imagen principal...');
        await propertyService.uploadCover(newProperty.id, data.image[0]);
      }

      // Subir galería de imágenes si existe
      if (data.images && data.images.length > 0) {
        showLoader(`Subiendo galería (${data.images.length} imágenes)...`);
        const imageFiles = Array.from(data.images);
        await propertyService.uploadGallery(newProperty.id, imageFiles);
      }

      showLoader('Finalizando...');
      
      // Redireccionamos a la página de propiedades
      router.push('/properties');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error creating property:', err.message);
      setError('Error al crear la propiedad. Por favor, intenta de nuevo.');
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Propiedad</h1>
            <p className="mt-2 text-gray-600">
              Completa la información para agregar una nueva propiedad al catálogo.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Información Básica</h2>

              <Input
                label="Nombre de la propiedad *"
                placeholder="Ej: Casa moderna en zona residencial"
                registration={register('name', {
                  required: 'El nombre de la propiedad es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  }
                })}
                error={errors.name?.message}
              />

              <Textarea
                label="Dirección *"
                placeholder="Ej: Calle 123 #45-67, Barrio Central, Ciudad"
                registration={register('address', {
                  required: 'La dirección es obligatoria',
                  minLength: {
                    value: 10,
                    message: 'La dirección debe ser más específica'
                  }
                })}
                error={errors.address?.message}
              />

              <Input
                type="number"
                step="0.01"
                label="Precio *"
                placeholder="Ej: 250000"
                registration={register('price', {
                  required: 'El precio es obligatorio',
                  min: {
                    value: 1,
                    message: 'El precio debe ser mayor a 0'
                  },
                  valueAsNumber: true
                })}
                error={errors.price?.message}
              />
            </div>

            {/* Ubicación */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Ubicación</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  step="any"
                  label="Latitud *"
                  placeholder="Ej: 4.570868"
                  registration={register('lat', {
                    required: 'La latitud es obligatoria',
                    valueAsNumber: true
                  })}
                  error={errors.lat?.message}
                />

                <Input
                  type="number"
                  step="any"
                  label="Longitud *"
                  placeholder="Ej: -74.297333"
                  registration={register('lng', {
                    required: 'La longitud es obligatoria',
                    valueAsNumber: true
                  })}
                  error={errors.lng?.message}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Puedes obtener las coordenadas exactas desde Google Maps haciendo clic derecho en la ubicación y seleccionando las coordenadas que aparecen.
                </p>
              </div>
            </div>

            {/* Imágenes */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Imágenes</h2>

              <FileInput
                label="Imagen de portada"
                registration={register('image')}
                accept="image/*"
                multiple={false}
              />

              <FileInput
                label="Galería de imágenes"
                registration={register('images')}
                accept="image/*"
                multiple={true}
              />
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="primary"
                onClick={() => router.back()}
                className="sm:w-auto"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                isLoading={isLoading}
                variant="secondary"
                className="sm:w-auto"
              >
                {isLoading ? 'Creando...' : 'Crear Propiedad'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
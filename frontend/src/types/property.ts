/**
 * Interfaz que define la estructura de una propiedad.
 * @group Tipos
 */
export interface Property {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string;
  images: string[];
  lat: number;
  lng: number;
}

/**
 * Interfaz para los filtros de búsqueda de propiedades.
 * Todos los campos son opcionales para permitir búsquedas flexibles.
 */
export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Interfaz para los datos del formulario de creación de propiedades.
 * Utilizada con React Hook Form para validación y manejo de estado.
 */
export interface CreatePropertyFormData {
  idOwner: string; // Iria quemado, normalmente vendria del usuario logueado
  /** Nombre descriptivo de la propiedad */
  name: string;
  /** Dirección completa de la propiedad */
  address: string;
  price: number;
  lat: number;
  lng: number;
  /** Archivo de imagen principal (opcional) */
  image?: FileList;
  /** Archivos de imágenes adicionales para la galería (opcional) */
  images?: FileList;
}

/**
 * Tipo para crear una nueva propiedad.
 * @group Tipos
 */
export interface CreateProperty {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  lat: number;
  lng: number;
}
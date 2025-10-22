import { CreateProperty, Property, PropertyFilters } from '@/types/property';
import apiClient from '@/config/apiClient';

/**
 * Servicio de propiedades que maneja todas las operaciones CRUD
 * Proporciona métodos para obtener, crear, actualizar y eliminar propiedades,
 * así como funcionalidades de carga de imágenes.
 * 
 * @service
 * @group Servicios
 */

const propertyService = {
  /**
   * Obtiene todas las propiedades con filtros opcionales.
   * 
   * @param filters - Filtros opcionales para buscar propiedades
   * @returns Promise con array de propiedades
   */
  async getAll(filters?: PropertyFilters) {
    const params = new URLSearchParams();
    if (filters?.name) params.append('name', filters.name);
    if (filters?.address) params.append('address', filters.address);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    const response = await apiClient.get<Property[]>('/properties', { params });
    return response.data;
  },

  /**
   * Crea una nueva propiedad en la base de datos.
   * 
   * @param data - FormData con la información de la propiedad
   * @returns Promise con la propiedad creada
   */
  async create(data: CreateProperty) {
    const response = await apiClient.post<Property>('/properties', data);
    return response.data;
  },

  /**
   * Sube una imagen de portada para una propiedad específica.
   * 
   * @param id - ID de la propiedad
   * @param file - Archivo de imagen a subir
   * @returns Promise con la respuesta del servidor
   */
  async uploadCover(id: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(`/properties/${id}/cover`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
   
  },

  async uploadGallery(id: string, files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    const response = await apiClient.post(`/properties/${id}/gallery`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get<Property>(`/properties/${id}`);
    if (!response.data.id) {
      throw new Error('Property not found');
    }
    return response.data;
  }
};



export default propertyService;
import propertyService from './propertyService';
import apiClient from '@/config/apiClient';
import { Property, PropertyFilters, CreateProperty } from '@/types/property';

// Mock del apiClient
jest.mock('@/config/apiClient');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('PropertyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    const mockProperties: Property[] = [
      {
        id: '1',
        name: 'Casa Moderna',
        address: 'Calle 123',
        price: 1000000,
        idOwner: 'owner1',
        image: 'https://example.com/cover1.jpg',
        images: ['https://example.com/1.jpg', 'https://example.com/2.jpg'],
        lat: 4.6097,
        lng: -74.0817
      },
      {
        id: '2',
        name: 'Apartamento Centro',
        address: 'Carrera 456',
        price: 800000,
        idOwner: 'owner2',
        image: 'https://example.com/cover2.jpg',
        images: ['https://example.com/3.jpg'],
        lat: 4.6097,
        lng: -74.0817
      }
    ];

    it('should fetch all properties without filters', async () => {
      mockApiClient.get.mockResolvedValueOnce({ data: mockProperties });

      const result = await propertyService.getAll();

      expect(mockApiClient.get).toHaveBeenCalledWith('/properties', { params: expect.any(URLSearchParams) });
      expect(result).toEqual(mockProperties);
    });

    it('should fetch properties with name filter', async () => {
      const filters: PropertyFilters = { name: 'Casa' };
      mockApiClient.get.mockResolvedValueOnce({ data: [mockProperties[0]] });

      const result = await propertyService.getAll(filters);

      expect(mockApiClient.get).toHaveBeenCalledWith('/properties', { 
        params: expect.any(URLSearchParams) 
      });
      expect(result).toEqual([mockProperties[0]]);
    });

    it('should fetch properties with address filter', async () => {
      const filters: PropertyFilters = { address: 'Calle' };
      mockApiClient.get.mockResolvedValueOnce({ data: [mockProperties[0]] });

      const result = await propertyService.getAll(filters);

      expect(mockApiClient.get).toHaveBeenCalledWith('/properties', { 
        params: expect.any(URLSearchParams) 
      });
      expect(result).toEqual([mockProperties[0]]);
    });

    it('should fetch properties with price range filters', async () => {
      const filters: PropertyFilters = { minPrice: 500000, maxPrice: 1200000 };
      mockApiClient.get.mockResolvedValueOnce({ data: mockProperties });

      const result = await propertyService.getAll(filters);

      expect(mockApiClient.get).toHaveBeenCalledWith('/properties', { 
        params: expect.any(URLSearchParams) 
      });
      expect(result).toEqual(mockProperties);
    });

    it('should fetch properties with all filters combined', async () => {
      const filters: PropertyFilters = {
        name: 'Casa',
        address: 'Calle',
        minPrice: 500000,
        maxPrice: 1200000
      };
      mockApiClient.get.mockResolvedValueOnce({ data: [mockProperties[0]] });

      const result = await propertyService.getAll(filters);

      expect(mockApiClient.get).toHaveBeenCalledWith('/properties', { 
        params: expect.any(URLSearchParams) 
      });
      expect(result).toEqual([mockProperties[0]]);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error';
      mockApiClient.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(propertyService.getAll()).rejects.toThrow(errorMessage);
    });
  });

  describe('create', () => {
    const mockCreateProperty: CreateProperty = {
      name: 'Nueva Casa',
      address: 'Nueva Dirección',
      price: 1500000,
      idOwner: 'owner3',
      lat: 4.6097,
      lng: -74.0817
    };

    const mockCreatedProperty: Property = {
      id: '3',
      ...mockCreateProperty,
      image: 'https://example.com/cover3.jpg',
      images: []
    };

    it('should create a new property successfully', async () => {
      mockApiClient.post.mockResolvedValueOnce({ data: mockCreatedProperty });

      const result = await propertyService.create(mockCreateProperty);

      expect(mockApiClient.post).toHaveBeenCalledWith('/properties', mockCreateProperty);
      expect(result).toEqual(mockCreatedProperty);
    });

    it('should handle creation errors', async () => {
      const errorMessage = 'Validation Error';
      mockApiClient.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(propertyService.create(mockCreateProperty)).rejects.toThrow(errorMessage);
    });
  });

  describe('getById', () => {
    const mockProperty: Property = {
      id: '1',
      name: 'Casa Específica',
      address: 'Dirección Específica',
      price: 2000000,
      idOwner: 'owner1',
      image: 'https://example.com/cover.jpg',
      images: ['https://example.com/gallery1.jpg'],
      lat: 4.6097,
      lng: -74.0817
    };

    it('should fetch property by ID successfully', async () => {
      mockApiClient.get.mockResolvedValueOnce({ data: mockProperty });

      const result = await propertyService.getById('1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/properties/1');
      expect(result).toEqual(mockProperty);
    });

    it('should throw error when property not found', async () => {
      mockApiClient.get.mockResolvedValueOnce({ data: {} });

      await expect(propertyService.getById('999')).rejects.toThrow('Property not found');
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Not Found';
      mockApiClient.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(propertyService.getById('1')).rejects.toThrow(errorMessage);
    });
  });

  describe('uploadCover', () => {
    const mockFile = new File(['fake content'], 'cover.jpg', { type: 'image/jpeg' });
    const mockResponse = { url: 'https://example.com/cover.jpg' };

    it('should upload cover image successfully', async () => {
      mockApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await propertyService.uploadCover('1', mockFile);

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/properties/1/cover',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle upload errors', async () => {
      const errorMessage = 'Upload failed';
      mockApiClient.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(propertyService.uploadCover('1', mockFile)).rejects.toThrow(errorMessage);
    });
  });

  describe('uploadGallery', () => {
    const mockFiles = [
      new File(['fake content 1'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['fake content 2'], 'image2.jpg', { type: 'image/jpeg' })
    ];
    const mockResponse = { urls: ['https://example.com/1.jpg', 'https://example.com/2.jpg'] };

    it('should upload gallery images successfully', async () => {
      mockApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await propertyService.uploadGallery('1', mockFiles);

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/properties/1/gallery',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle upload errors', async () => {
      const errorMessage = 'Gallery upload failed';
      mockApiClient.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(propertyService.uploadGallery('1', mockFiles)).rejects.toThrow(errorMessage);
    });

    it('should handle empty files array', async () => {
      mockApiClient.post.mockResolvedValueOnce({ data: { urls: [] } });

      const result = await propertyService.uploadGallery('1', []);

      expect(mockApiClient.post).toHaveBeenCalled();
      expect(result).toEqual({ urls: [] });
    });
  });
});
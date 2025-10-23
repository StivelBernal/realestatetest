import { Property, PropertyFilters, CreatePropertyFormData, CreateProperty } from './property';

describe('Property Types', () => {
  describe('Property Interface', () => {
    it('should create a valid Property object', () => {
      const property: Property = {
        id: 'prop-123',
        idOwner: 'owner-456',
        name: 'Casa moderna en zona norte',
        address: 'Calle 123 #45-67, Bogotá',
        price: 500000000,
        image: 'https://example.com/image.jpg',
        images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
        lat: 4.6097,
        lng: -74.0817
      };

      expect(property.id).toBe('prop-123');
      expect(property.idOwner).toBe('owner-456');
      expect(property.name).toBe('Casa moderna en zona norte');
      expect(property.address).toBe('Calle 123 #45-67, Bogotá');
      expect(property.price).toBe(500000000);
      expect(property.image).toBe('https://example.com/image.jpg');
      expect(property.images).toHaveLength(2);
      expect(property.lat).toBe(4.6097);
      expect(property.lng).toBe(-74.0817);
    });

    it('should validate Property required fields', () => {
      const property: Property = {
        id: '',
        idOwner: '',
        name: '',
        address: '',
        price: 0,
        image: '',
        images: [],
        lat: 0,
        lng: 0
      };

      expect(typeof property.id).toBe('string');
      expect(typeof property.idOwner).toBe('string');
      expect(typeof property.name).toBe('string');
      expect(typeof property.address).toBe('string');
      expect(typeof property.price).toBe('number');
      expect(typeof property.image).toBe('string');
      expect(Array.isArray(property.images)).toBe(true);
      expect(typeof property.lat).toBe('number');
      expect(typeof property.lng).toBe('number');
    });

    it('should handle Bogotá coordinates correctly', () => {
      const bogotaProperty: Property = {
        id: 'bog-001',
        idOwner: 'owner-001',
        name: 'Apartamento en Chapinero',
        address: 'Zona Rosa, Bogotá',
        price: 300000000,
        image: 'cover.jpg',
        images: [],
        lat: 4.6516,
        lng: -74.0575
      };

      expect(bogotaProperty.lat).toBeGreaterThan(4);
      expect(bogotaProperty.lat).toBeLessThan(5);
      expect(bogotaProperty.lng).toBeLessThan(-74);
      expect(bogotaProperty.lng).toBeGreaterThan(-75);
    });
  });

  describe('PropertyFilters Interface', () => {
    it('should create filters with all fields', () => {
      const filters: PropertyFilters = {
        name: 'apartamento',
        address: 'bogotá',
        minPrice: 200000000,
        maxPrice: 800000000
      };

      expect(filters.name).toBe('apartamento');
      expect(filters.address).toBe('bogotá');
      expect(filters.minPrice).toBe(200000000);
      expect(filters.maxPrice).toBe(800000000);
    });

    it('should create filters with partial fields', () => {
      const filters: PropertyFilters = {
        name: 'casa'
      };

      expect(filters.name).toBe('casa');
      expect(filters.address).toBeUndefined();
      expect(filters.minPrice).toBeUndefined();
      expect(filters.maxPrice).toBeUndefined();
    });

    it('should create empty filters object', () => {
      const filters: PropertyFilters = {};

      expect(Object.keys(filters)).toHaveLength(0);
    });

    it('should handle price range filters', () => {
      const priceFilters: PropertyFilters = {
        minPrice: 100000000, // 100M COP
        maxPrice: 1000000000 // 1B COP
      };

      expect(priceFilters.minPrice).toBe(100000000);
      expect(priceFilters.maxPrice).toBe(1000000000);
      expect(priceFilters.maxPrice).toBeGreaterThan(priceFilters.minPrice!);
    });
  });

  describe('CreatePropertyFormData Interface', () => {
    it('should create form data with required fields', () => {
      const formData: CreatePropertyFormData = {
        idOwner: 'owner-123',
        name: 'Nueva propiedad',
        address: 'Dirección de prueba',
        price: 450000000,
        lat: 4.6097,
        lng: -74.0817
      };

      expect(formData.idOwner).toBe('owner-123');
      expect(formData.name).toBe('Nueva propiedad');
      expect(formData.address).toBe('Dirección de prueba');
      expect(formData.price).toBe(450000000);
      expect(formData.lat).toBe(4.6097);
      expect(formData.lng).toBe(-74.0817);
      expect(formData.image).toBeUndefined();
      expect(formData.images).toBeUndefined();
    });

    it('should validate coordinates format', () => {
      const formData: CreatePropertyFormData = {
        idOwner: 'owner-123',
        name: 'Propiedad con coordenadas',
        address: 'Bogotá, Colombia',
        price: 350000000,
        lat: 4.7110,
        lng: -74.0721
      };

      expect(typeof formData.lat).toBe('number');
      expect(typeof formData.lng).toBe('number');
      expect(formData.lat).toBeGreaterThan(-90);
      expect(formData.lat).toBeLessThan(90);
      expect(formData.lng).toBeGreaterThan(-180);
      expect(formData.lng).toBeLessThan(180);
    });
  });

  describe('CreateProperty Interface', () => {
    it('should create a property for API submission', () => {
      const createProperty: CreateProperty = {
        idOwner: 'owner-789',
        name: 'Casa de prueba',
        address: 'Calle de prueba 123',
        price: 320000000,
        lat: 4.6351,
        lng: -74.0703
      };

      expect(createProperty.idOwner).toBe('owner-789');
      expect(createProperty.name).toBe('Casa de prueba');
      expect(createProperty.address).toBe('Calle de prueba 123');
      expect(createProperty.price).toBe(320000000);
      expect(createProperty.lat).toBe(4.6351);
      expect(createProperty.lng).toBe(-74.0703);
    });

    it('should not have image fields in CreateProperty', () => {
      const createProperty: CreateProperty = {
        idOwner: 'owner-999',
        name: 'Sin imágenes',
        address: 'Dirección sin imágenes',
        price: 280000000,
        lat: 4.6200,
        lng: -74.0800
      };

      // Verificar que no tiene campos de imagen
      expect('image' in createProperty).toBe(false);
      expect('images' in createProperty).toBe(false);
    });

    it('should validate price as positive number', () => {
      const createProperty: CreateProperty = {
        idOwner: 'owner-555',
        name: 'Propiedad económica',
        address: 'Zona económica',
        price: 150000000,
        lat: 4.5500,
        lng: -74.1000
      };

      expect(createProperty.price).toBeGreaterThan(0);
      expect(typeof createProperty.price).toBe('number');
    });
  });

  describe('Type Compatibility', () => {
    it('should convert CreateProperty to Property-like structure', () => {
      const createProperty: CreateProperty = {
        idOwner: 'owner-123',
        name: 'Test Property',
        address: 'Test Address',
        price: 400000000,
        lat: 4.6097,
        lng: -74.0817
      };

      // Simular lo que retornaría la API
      const propertyFromAPI: Property = {
        id: 'generated-id',
        image: '',
        images: [],
        ...createProperty
      };

      expect(propertyFromAPI.id).toBe('generated-id');
      expect(propertyFromAPI.idOwner).toBe(createProperty.idOwner);
      expect(propertyFromAPI.name).toBe(createProperty.name);
      expect(propertyFromAPI.address).toBe(createProperty.address);
      expect(propertyFromAPI.price).toBe(createProperty.price);
      expect(propertyFromAPI.lat).toBe(createProperty.lat);
      expect(propertyFromAPI.lng).toBe(createProperty.lng);
    });
  });
});
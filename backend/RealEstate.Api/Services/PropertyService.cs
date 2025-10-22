using MongoDB.Driver;
using RealEstate.Api.DTOs;
using RealEstate.Api.Interfaces;
using RealEstate.Api.Models;

namespace RealEstate.Api.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IMongoCollection<Property> _collection;
        private readonly S3Service _s3Service;
        private readonly IOwnerService _ownerService;
        private readonly IPropertyTraceService _propertyTraceService;

        public PropertyService(IConfiguration config, S3Service s3Service, IOwnerService ownerService, IPropertyTraceService propertyTraceService)
        {
            var client = new MongoClient(config["MongoDbSettings:ConnectionString"]);
            var database = client.GetDatabase(config["MongoDbSettings:DatabaseName"]);
            _collection = database.GetCollection<Property>(config["MongoDbSettings:CollectionName"]);
            _s3Service = s3Service;
            _ownerService = ownerService;
            _propertyTraceService = propertyTraceService;
        }

        public async Task<IEnumerable<PropertyDto>> GetAllAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
        {
            var filter = Builders<Property>.Filter.Empty;

            if (!string.IsNullOrEmpty(name))
                filter &= Builders<Property>.Filter.Regex("name", new MongoDB.Bson.BsonRegularExpression(name, "i"));

            if (!string.IsNullOrEmpty(address))
                filter &= Builders<Property>.Filter.Regex("address", new MongoDB.Bson.BsonRegularExpression(address, "i"));

            if (minPrice.HasValue)
                filter &= Builders<Property>.Filter.Gte("price", minPrice.Value);

            if (maxPrice.HasValue)
                filter &= Builders<Property>.Filter.Lte("price", maxPrice.Value);

            var properties = await _collection.Find(filter).ToListAsync();

            return properties.Select(p => new PropertyDto
            {
                Id = p.Id!,
                IdOwner = p.IdOwner,
                Name = p.Name,
                Address = p.Address,
                Price = p.Price,
                Image = p.Image,
                Images = p.Images?.Select(i => i.File).ToList() ?? new List<string>(),
                Lat = p.Location.Lat,
                Lng = p.Location.Lng
            });
        }

        public async Task<PropertyDto?> GetByIdAsync(string id)
        {
            var property = await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
            return property == null ? null : new PropertyDto
            {
                Id = property.Id!,
                IdOwner = property.IdOwner,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                Image = property.Image,
                Images = property.Images?.Select(i => i.File).ToList() ?? new List<string>(),
                Lat = property.Location.Lat,
                Lng = property.Location.Lng
            };
        }

        public async Task<PropertyDetailDto?> GetDetailByIdAsync(string id)
        {
            var property = await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
            if (property == null) return null;

            // Obtener información del propietario
            var owner = await _ownerService.GetByOwnerIdAsync(property.IdOwner);
            
            // Obtener historial de transacciones
            var propertyTraces = await _propertyTraceService.GetByPropertyIdAsync(property.Id!);

            return new PropertyDetailDto
            {
                Id = property.Id!,
                IdProperty = property.IdProperty,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                CodeInternal = property.CodeInternal,
                Year = property.Year,
                Image = property.Image,
                Images = property.Images?.Select(i => i.File).ToList() ?? new List<string>(),
                Lat = property.Location.Lat,
                Lng = property.Location.Lng,
                CreatedAt = property.CreatedAt,
                UpdatedAt = property.UpdatedAt,
                Owner = owner != null ? new OwnerDto
                {
                    Id = owner.Id!,
                    IdOwner = owner.IdOwner,
                    Name = owner.Name,
                    Address = owner.Address,
                    Photo = owner.Photo,
                    Birthday = owner.Birthday,
                    CreatedAt = owner.CreatedAt,
                    UpdatedAt = owner.UpdatedAt
                } : null,
                PropertyTraces = propertyTraces.Select(pt => new PropertyTraceDto
                {
                    Id = pt.Id!,
                    IdPropertyTrace = pt.IdPropertyTrace,
                    DateSale = pt.DateSale,
                    Name = pt.Name,
                    Value = pt.Value,
                    Tax = pt.Tax,
                    CreatedAt = pt.CreatedAt,
                    UpdatedAt = pt.UpdatedAt
                }).ToList()
            };
        }

        public async Task<Property?> GetModelByIdAsync(string id)
        {
            return await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(string id, Property property)
        {
            // Aseguramos que el id coincida
            property.Id = id;
            await _collection.ReplaceOneAsync(p => p.Id == id, property);
        }

        public async Task<Property> CreateAsync(CreatePropertyDto dto)
        {
            var property = new Property
            {
                IdProperty = $"PROP{DateTime.UtcNow:yyyyMMdd}{new Random().Next(1000, 9999)}",
                IdOwner = dto.IdOwner,
                Name = dto.Name,
                Address = dto.Address,
                Price = dto.Price,
                CodeInternal = $"INT{DateTime.UtcNow:yyyyMMdd}{new Random().Next(100, 999)}",
                Year = DateTime.UtcNow.Year,
                Image = dto.Image ?? string.Empty,
                Location = new GeoLocation
                {
                    Lat = dto.Lat,
                    Lng = dto.Lng
                },
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            if (dto.Images != null && dto.Images.Any())
            {
                property.Images = dto.Images
                    .Select(url => new PropertyImage { File = url, Enabled = true })
                    .ToList();
            }

            await _collection.InsertOneAsync(property);
            return property;
        }

        public async Task<string> UploadCoverAsync(string id, IFormFile file)
        {
            var property = await GetModelByIdAsync(id);
            if (property == null) throw new Exception("Property not found");

            var url = await _s3Service.UploadFileAsync(file);
            property.Image = url;
            await UpdateAsync(id, property);
            return url;
        }

        public async Task<IEnumerable<string>> UploadGalleryAsync(string id, IEnumerable<IFormFile> files)
        {
            var property = await GetModelByIdAsync(id);
            if (property == null) throw new Exception("Property not found");

            var urls = new List<string>();
            foreach (var file in files)
            {
                var url = await _s3Service.UploadFileAsync(file);
                property.Images.Add(new PropertyImage { File = url, Enabled = true });
                urls.Add(url);
            }

            await UpdateAsync(id, property);
            return urls;
        }


    }
}

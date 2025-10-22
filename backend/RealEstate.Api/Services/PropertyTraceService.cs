using MongoDB.Driver;
using RealEstate.Api.Interfaces;
using RealEstate.Api.Models;

namespace RealEstate.Api.Services
{
    public class PropertyTraceService : IPropertyTraceService
    {
        private readonly IMongoCollection<PropertyTrace> _propertyTraces;

        public PropertyTraceService(IMongoDatabase database)
        {
            _propertyTraces = database.GetCollection<PropertyTrace>("propertytraces");
        }

        public async Task<List<PropertyTrace>> GetAllAsync()
        {
            return await _propertyTraces.Find(_ => true).ToListAsync();
        }

        public async Task<PropertyTrace?> GetByIdAsync(string id)
        {
            return await _propertyTraces.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<PropertyTrace>> GetByPropertyIdAsync(string propertyId)
        {
            return await _propertyTraces.Find(x => x.IdProperty == propertyId).ToListAsync();
        }

        public async Task<PropertyTrace> CreateAsync(PropertyTrace propertyTrace)
        {
            // Generar IdPropertyTrace único si no se proporciona
            if (string.IsNullOrEmpty(propertyTrace.IdPropertyTrace))
            {
                propertyTrace.IdPropertyTrace = $"TRC{DateTime.UtcNow:yyyyMMdd}{new Random().Next(1000, 9999)}";
            }

            propertyTrace.CreatedAt = DateTime.UtcNow;
            propertyTrace.UpdatedAt = DateTime.UtcNow;

            await _propertyTraces.InsertOneAsync(propertyTrace);
            return propertyTrace;
        }
    }
}
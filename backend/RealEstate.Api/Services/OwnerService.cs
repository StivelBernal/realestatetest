using MongoDB.Driver;
using RealEstate.Api.Interfaces;
using RealEstate.Api.Models;

namespace RealEstate.Api.Services
{
    public class OwnerService : IOwnerService
    {
        private readonly IMongoCollection<Owner> _owners;

        public OwnerService(IMongoDatabase database)
        {
            _owners = database.GetCollection<Owner>("owners");
        }

        public async Task<List<Owner>> GetAllAsync()
        {
            return await _owners.Find(_ => true).ToListAsync();
        }

        public async Task<Owner?> GetByOwnerIdAsync(string ownerId)
        {
            return await _owners.Find(x => x.IdOwner == ownerId).FirstOrDefaultAsync();
        }

        public async Task<Owner> CreateAsync(Owner owner)
        {
            // Generar IdOwner único si no se proporciona
            if (string.IsNullOrEmpty(owner.IdOwner))
            {
                owner.IdOwner = $"OWN{DateTime.UtcNow:yyyyMMdd}{new Random().Next(1000, 9999)}";
            }

            owner.CreatedAt = DateTime.UtcNow;
            owner.UpdatedAt = DateTime.UtcNow;

            await _owners.InsertOneAsync(owner);
            return owner;
        }
    }
}
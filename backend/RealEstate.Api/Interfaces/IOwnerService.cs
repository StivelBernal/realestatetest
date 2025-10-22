using RealEstate.Api.Models;

namespace RealEstate.Api.Interfaces
{
    public interface IOwnerService
    {
        Task<List<Owner>> GetAllAsync();
        Task<Owner?> GetByOwnerIdAsync(string ownerId);
        Task<Owner> CreateAsync(Owner owner);
    }
}
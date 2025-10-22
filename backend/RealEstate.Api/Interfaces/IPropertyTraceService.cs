using RealEstate.Api.Models;

namespace RealEstate.Api.Interfaces
{
    public interface IPropertyTraceService
    {
        Task<List<PropertyTrace>> GetAllAsync();
        Task<PropertyTrace?> GetByIdAsync(string id);
        Task<List<PropertyTrace>> GetByPropertyIdAsync(string propertyId);
        Task<PropertyTrace> CreateAsync(PropertyTrace propertyTrace);
    }
}
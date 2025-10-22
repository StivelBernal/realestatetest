using RealEstate.Api.DTOs;
using RealEstate.Api.Models;

namespace RealEstate.Api.Interfaces
{
    public interface IPropertyService
    {
        Task<IEnumerable<PropertyDto>> GetAllAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice);
        Task<PropertyDto?> GetByIdAsync(string id);
        Task<PropertyDetailDto?> GetDetailByIdAsync(string id);
        // Devuelve el modelo completo para operaciones de escritura (subir imágenes, actualizar)
        Task<Property?> GetModelByIdAsync(string id);
        // Actualiza la propiedad completa en la colección
        Task UpdateAsync(string id, Property property);

        Task<Property> CreateAsync(CreatePropertyDto dto);
    // Sube/actualiza la imagen principal (cover) y devuelve la url
    Task<string> UploadCoverAsync(string id, IFormFile file);
    // Sube una o varias imágenes a la galería y devuelve las urls añadidas
    Task<IEnumerable<string>> UploadGalleryAsync(string id, IEnumerable<IFormFile> files);

    }
}

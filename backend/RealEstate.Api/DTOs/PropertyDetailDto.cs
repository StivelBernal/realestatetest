using RealEstate.Api.Models;

namespace RealEstate.Api.DTOs
{
    public class PropertyDetailDto
    {
        public string Id { get; set; } = string.Empty;
        public string IdProperty { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string CodeInternal { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Image { get; set; } = string.Empty;
        public List<string> Images { get; set; } = new();
        public double Lat { get; set; }
        public double Lng { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Información del propietario
        public OwnerDto? Owner { get; set; }

        // Historial de transacciones
        public List<PropertyTraceDto> PropertyTraces { get; set; } = new();
    }

    public class OwnerDto
    {
        public string Id { get; set; } = string.Empty;
        public string IdOwner { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class PropertyTraceDto
    {
        public string Id { get; set; } = string.Empty;
        public string IdPropertyTrace { get; set; } = string.Empty;
        public DateTime DateSale { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public decimal Tax { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
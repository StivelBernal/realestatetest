namespace RealEstate.Api.DTOs
{
    public class PropertyDto
    {
        public string Id { get; set; } = string.Empty;
        public string IdOwner { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public decimal Price { get; set; }
        // Portada
        public string Image { get; set; } = string.Empty;
        // Galería
        public List<string> Images { get; set; } = new();
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}

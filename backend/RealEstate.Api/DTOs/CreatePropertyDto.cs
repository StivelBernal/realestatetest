public class CreatePropertyDto
{
    public string IdOwner { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public string? Image { get; set; } // portada opcional
    public List<string>? Images { get; set; } // galería opcional

    public double Lat { get; set; }
    public double Lng { get; set; }
}

namespace RealEstate.Api.Models
{
    public class PropertyImage
    {
        public string File { get; set; } = string.Empty;   // URL de S3
        public bool Enabled { get; set; } = true;          // Por si luego desactivamos imágenes sin borrarlas
    }
}

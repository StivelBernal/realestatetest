using NUnit.Framework;
using RealEstate.Api.DTOs;

namespace RealEstate.Tests.DTOs
{
    [TestFixture]
    public class PropertyDtoTests
    {
        [Test]
        public void PropertyDto_ShouldInitializeWithDefaultValues()
        {
            // Act
            var dto = new PropertyDto();

            // Assert
            Assert.That(dto.Id, Is.EqualTo(string.Empty));
            Assert.That(dto.IdOwner, Is.EqualTo(string.Empty));
            Assert.That(dto.Name, Is.EqualTo(string.Empty));
            Assert.That(dto.Address, Is.EqualTo(string.Empty));
            Assert.That(dto.Price, Is.EqualTo(0));
            Assert.That(dto.Image, Is.EqualTo(string.Empty));
            Assert.That(dto.Images, Is.Not.Null);
            Assert.That(dto.Images.Count, Is.EqualTo(0));
            Assert.That(dto.Lat, Is.EqualTo(0));
            Assert.That(dto.Lng, Is.EqualTo(0));
        }

        [Test]
        public void PropertyDto_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var expectedImages = new List<string> { "image1.jpg", "image2.jpg", "image3.jpg" };

            // Act
            var dto = new PropertyDto
            {
                Id = "PROP123",
                IdOwner = "OWN456",
                Name = "Casa moderna en Bogotá",
                Address = "Calle 123 #45-67, Bogotá",
                Price = 500000000,
                Image = "cover.jpg",
                Images = expectedImages,
                Lat = 4.6097,
                Lng = -74.0817
            };

            // Assert
            Assert.That(dto.Id, Is.EqualTo("PROP123"));
            Assert.That(dto.IdOwner, Is.EqualTo("OWN456"));
            Assert.That(dto.Name, Is.EqualTo("Casa moderna en Bogotá"));
            Assert.That(dto.Address, Is.EqualTo("Calle 123 #45-67, Bogotá"));
            Assert.That(dto.Price, Is.EqualTo(500000000));
            Assert.That(dto.Image, Is.EqualTo("cover.jpg"));
            Assert.That(dto.Images, Is.EqualTo(expectedImages));
            Assert.That(dto.Images.Count, Is.EqualTo(3));
            Assert.That(dto.Lat, Is.EqualTo(4.6097));
            Assert.That(dto.Lng, Is.EqualTo(-74.0817));
        }

        [Test]
        public void PropertyDto_ShouldHandleBogotaCoordinates()
        {
            // Act
            var dto = new PropertyDto
            {
                Name = "Apartamento en Zona Rosa",
                Address = "Zona Rosa, Bogotá",
                Lat = 4.6516,
                Lng = -74.0575
            };

            // Assert
            Assert.That(dto.Lat, Is.GreaterThan(4));
            Assert.That(dto.Lat, Is.LessThan(5));
            Assert.That(dto.Lng, Is.LessThan(-74));
            Assert.That(dto.Lng, Is.GreaterThan(-75));
        }

        [Test]
        public void PropertyDto_ShouldHandleHighPriceValues()
        {
            // Act
            var dto = new PropertyDto
            {
                Name = "Casa de lujo",
                Price = 2500000000 // 2.5 mil millones
            };

            // Assert
            Assert.That(dto.Price, Is.EqualTo(2500000000));
            Assert.That(dto.Price, Is.GreaterThan(1000000000)); // Mayor a 1 mil millones
        }

        [Test]
        public void PropertyDto_Images_ShouldBeModifiable()
        {
            // Arrange
            var dto = new PropertyDto();

            // Act
            dto.Images.Add("image1.jpg");
            dto.Images.Add("image2.jpg");

            // Assert
            Assert.That(dto.Images.Count, Is.EqualTo(2));
            Assert.That(dto.Images[0], Is.EqualTo("image1.jpg"));
            Assert.That(dto.Images[1], Is.EqualTo("image2.jpg"));
        }
    }

    [TestFixture]
    public class CreatePropertyDtoTests
    {
        [Test]
        public void CreatePropertyDto_ShouldInitializeWithDefaultValues()
        {
            // Act
            var dto = new CreatePropertyDto();

            // Assert
            Assert.That(dto.IdOwner, Is.EqualTo(string.Empty));
            Assert.That(dto.Name, Is.EqualTo(string.Empty));
            Assert.That(dto.Address, Is.EqualTo(string.Empty));
            Assert.That(dto.Price, Is.EqualTo(0));
            Assert.That(dto.Image, Is.Null);
            Assert.That(dto.Images, Is.Null);
            Assert.That(dto.Lat, Is.EqualTo(0));
            Assert.That(dto.Lng, Is.EqualTo(0));
        }

        [Test]
        public void CreatePropertyDto_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var expectedImages = new List<string> { "gallery1.jpg", "gallery2.jpg" };

            // Act
            var dto = new CreatePropertyDto
            {
                IdOwner = "OWN789",
                Name = "Nueva propiedad",
                Address = "Carrera 15 #20-30, Medellín",
                Price = 350000000,
                Image = "main.jpg",
                Images = expectedImages,
                Lat = 6.2442,
                Lng = -75.5812
            };

            // Assert
            Assert.That(dto.IdOwner, Is.EqualTo("OWN789"));
            Assert.That(dto.Name, Is.EqualTo("Nueva propiedad"));
            Assert.That(dto.Address, Is.EqualTo("Carrera 15 #20-30, Medellín"));
            Assert.That(dto.Price, Is.EqualTo(350000000));
            Assert.That(dto.Image, Is.EqualTo("main.jpg"));
            Assert.That(dto.Images, Is.EqualTo(expectedImages));
            Assert.That(dto.Lat, Is.EqualTo(6.2442));
            Assert.That(dto.Lng, Is.EqualTo(-75.5812));
        }

        [Test]
        public void CreatePropertyDto_ShouldHandleMedellinCoordinates()
        {
            // Act
            var dto = new CreatePropertyDto
            {
                Name = "Apartamento en El Poblado",
                Address = "El Poblado, Medellín",
                Lat = 6.2442,
                Lng = -75.5812
            };

            // Assert
            Assert.That(dto.Lat, Is.GreaterThan(6));
            Assert.That(dto.Lat, Is.LessThan(7));
            Assert.That(dto.Lng, Is.LessThan(-75));
            Assert.That(dto.Lng, Is.GreaterThan(-76));
        }

        [Test]
        public void CreatePropertyDto_OptionalImages_ShouldBeNullable()
        {
            // Act
            var dto = new CreatePropertyDto
            {
                IdOwner = "OWN999",
                Name = "Propiedad sin imágenes",
                Address = "Dirección de prueba",
                Price = 200000000,
                Lat = 4.6097,
                Lng = -74.0817
                // Image e Images permanecen null
            };

            // Assert
            Assert.That(dto.Image, Is.Null);
            Assert.That(dto.Images, Is.Null);
            Assert.That(dto.IdOwner, Is.Not.Empty);
            Assert.That(dto.Name, Is.Not.Empty);
        }

        [Test]
        public void CreatePropertyDto_ShouldHandleMinimumPrice()
        {
            // Act
            var dto = new CreatePropertyDto
            {
                Name = "Propiedad económica",
                Price = 50000000 // 50 millones
            };

            // Assert
            Assert.That(dto.Price, Is.EqualTo(50000000));
            Assert.That(dto.Price, Is.GreaterThan(0));
        }

        [Test]
        public void CreatePropertyDto_ShouldValidateRequiredFields()
        {
            // Act
            var dto = new CreatePropertyDto
            {
                IdOwner = "REQ_OWNER",
                Name = "REQ_NAME",
                Address = "REQ_ADDRESS",
                Price = 100000000,
                Lat = 4.6097,
                Lng = -74.0817
            };

            // Assert - Verificar que los campos requeridos no estén vacíos
            Assert.That(dto.IdOwner, Is.Not.Empty);
            Assert.That(dto.Name, Is.Not.Empty);
            Assert.That(dto.Address, Is.Not.Empty);
            Assert.That(dto.Price, Is.GreaterThan(0));
            Assert.That(dto.Lat, Is.Not.EqualTo(0));
            Assert.That(dto.Lng, Is.Not.EqualTo(0));
        }
    }
}
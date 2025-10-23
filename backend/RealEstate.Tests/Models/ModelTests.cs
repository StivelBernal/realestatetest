using NUnit.Framework;
using RealEstate.Api.Models;

namespace RealEstate.Tests.Models
{
    [TestFixture]
    public class PropertyTests
    {
        [Test]
        public void Property_ShouldInitializeWithDefaultValues()
        {
            // Act
            var property = new Property();

            // Assert
            Assert.That(property.Id, Is.Null);
            Assert.That(property.IdProperty, Is.EqualTo(string.Empty));
            Assert.That(property.Name, Is.EqualTo(string.Empty));
            Assert.That(property.Address, Is.EqualTo(string.Empty));
            Assert.That(property.Price, Is.EqualTo(0));
            Assert.That(property.CodeInternal, Is.EqualTo(string.Empty));
            Assert.That(property.Year, Is.EqualTo(0));
            Assert.That(property.IdOwner, Is.EqualTo(string.Empty));
            Assert.That(property.Image, Is.EqualTo(string.Empty));
            Assert.That(property.Location, Is.Not.Null);
            Assert.That(property.Images, Is.Not.Null);
            Assert.That(property.Images.Count, Is.EqualTo(0));
            Assert.That(property.CreatedAt, Is.Not.EqualTo(default(DateTime)));
            Assert.That(property.UpdatedAt, Is.Not.EqualTo(default(DateTime)));
            Assert.That(property.Owner, Is.Null);
        }

        [Test]
        public void Property_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var location = new GeoLocation { Lat = 4.6097, Lng = -74.0817 };
            var images = new List<PropertyImage>
            {
                new PropertyImage { File = "image1.jpg", Enabled = true },
                new PropertyImage { File = "image2.jpg", Enabled = true }
            };
            var owner = new Owner { IdOwner = "OWN123", Name = "Juan Pérez" };

            // Act
            var property = new Property
            {
                Id = "PROP123",
                IdProperty = "PROP_INTERNAL_123",
                Name = "Casa moderna en Bogotá",
                Address = "Calle 123 #45-67, Bogotá",
                Price = 500000000,
                CodeInternal = "INT_CODE_123",
                Year = 2023,
                IdOwner = "OWN123",
                Image = "cover.jpg",
                Location = location,
                Images = images,
                Owner = owner
            };

            // Assert
            Assert.That(property.Id, Is.EqualTo("PROP123"));
            Assert.That(property.IdProperty, Is.EqualTo("PROP_INTERNAL_123"));
            Assert.That(property.Name, Is.EqualTo("Casa moderna en Bogotá"));
            Assert.That(property.Address, Is.EqualTo("Calle 123 #45-67, Bogotá"));
            Assert.That(property.Price, Is.EqualTo(500000000));
            Assert.That(property.CodeInternal, Is.EqualTo("INT_CODE_123"));
            Assert.That(property.Year, Is.EqualTo(2023));
            Assert.That(property.IdOwner, Is.EqualTo("OWN123"));
            Assert.That(property.Image, Is.EqualTo("cover.jpg"));
            Assert.That(property.Location, Is.EqualTo(location));
            Assert.That(property.Images, Is.EqualTo(images));
            Assert.That(property.Images.Count, Is.EqualTo(2));
            Assert.That(property.Owner, Is.EqualTo(owner));
        }

        [Test]
        public void Property_ShouldHandleHighPriceValues()
        {
            // Act
            var property = new Property
            {
                Name = "Mansión de lujo",
                Price = 5000000000 // 5 mil millones
            };

            // Assert
            Assert.That(property.Price, Is.EqualTo(5000000000));
            Assert.That(property.Price, Is.GreaterThan(1000000000));
        }

        [Test]
        public void Property_ShouldHandleCurrentYear()
        {
            // Act
            var property = new Property
            {
                Name = "Propiedad nueva",
                Year = 2024
            };

            // Assert
            Assert.That(property.Year, Is.EqualTo(2024));
            Assert.That(property.Year, Is.GreaterThan(2000));
            Assert.That(property.Year, Is.LessThanOrEqualTo(DateTime.Now.Year));
        }

        [Test]
        public void Property_Location_ShouldWorkWithBogotaCoordinates()
        {
            // Act
            var property = new Property
            {
                Name = "Apartamento Zona Rosa",
                Location = new GeoLocation { Lat = 4.6516, Lng = -74.0575 }
            };

            // Assert
            Assert.That(property.Location.Lat, Is.EqualTo(4.6516));
            Assert.That(property.Location.Lng, Is.EqualTo(-74.0575));
            Assert.That(property.Location.Lat, Is.GreaterThan(4));
            Assert.That(property.Location.Lat, Is.LessThan(5));
        }

        [Test]
        public void Property_Images_ShouldBeModifiable()
        {
            // Arrange
            var property = new Property();

            // Act
            property.Images.Add(new PropertyImage { File = "image1.jpg", Enabled = true });
            property.Images.Add(new PropertyImage { File = "image2.jpg", Enabled = true });

            // Assert
            Assert.That(property.Images.Count, Is.EqualTo(2));
            Assert.That(property.Images[0].File, Is.EqualTo("image1.jpg"));
            Assert.That(property.Images[1].File, Is.EqualTo("image2.jpg"));
        }

        [Test]
        public void Property_CreatedAndUpdatedAt_ShouldBeSetOnCreation()
        {
            // Arrange
            var beforeCreation = DateTime.UtcNow.AddSeconds(-1);

            // Act
            var property = new Property();
            var afterCreation = DateTime.UtcNow.AddSeconds(1);

            // Assert
            Assert.That(property.CreatedAt, Is.GreaterThan(beforeCreation));
            Assert.That(property.CreatedAt, Is.LessThan(afterCreation));
            Assert.That(property.UpdatedAt, Is.GreaterThan(beforeCreation));
            Assert.That(property.UpdatedAt, Is.LessThan(afterCreation));
        }
    }

    [TestFixture]
    public class OwnerTests
    {
        [Test]
        public void Owner_ShouldInitializeWithDefaultValues()
        {
            // Act
            var owner = new Owner();

            // Assert
            Assert.That(owner.Id, Is.Null);
            Assert.That(owner.IdOwner, Is.EqualTo(string.Empty));
            Assert.That(owner.Name, Is.EqualTo(string.Empty));
            Assert.That(owner.Address, Is.EqualTo(string.Empty));
            Assert.That(owner.Photo, Is.EqualTo(string.Empty));
            Assert.That(owner.Birthday, Is.EqualTo(default(DateTime)));
            Assert.That(owner.CreatedAt, Is.Not.EqualTo(default(DateTime)));
        }

        [Test]
        public void Owner_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var birthday = DateTime.Parse("1980-05-15");
            var createdAt = DateTime.UtcNow;

            // Act
            var owner = new Owner
            {
                Id = "OWN123",
                IdOwner = "OWN_INTERNAL_123",
                Name = "María García",
                Address = "Carrera 45 #12-34, Medellín",
                Photo = "maria_photo.jpg",
                Birthday = birthday,
                CreatedAt = createdAt,
                UpdatedAt = createdAt
            };

            // Assert
            Assert.That(owner.Id, Is.EqualTo("OWN123"));
            Assert.That(owner.IdOwner, Is.EqualTo("OWN_INTERNAL_123"));
            Assert.That(owner.Name, Is.EqualTo("María García"));
            Assert.That(owner.Address, Is.EqualTo("Carrera 45 #12-34, Medellín"));
            Assert.That(owner.Photo, Is.EqualTo("maria_photo.jpg"));
            Assert.That(owner.Birthday, Is.EqualTo(birthday));
            Assert.That(owner.CreatedAt, Is.EqualTo(createdAt));
            Assert.That(owner.UpdatedAt, Is.EqualTo(createdAt));
        }

        [Test]
        public void Owner_ShouldHandleValidBirthdayRange()
        {
            // Act
            var owner = new Owner
            {
                Name = "Carlos Rodríguez",
                Birthday = DateTime.Parse("1975-12-25")
            };

            // Assert
            Assert.That(owner.Birthday.Year, Is.EqualTo(1975));
            Assert.That(owner.Birthday, Is.LessThan(DateTime.Now));
            Assert.That(owner.Birthday.Year, Is.GreaterThan(1900));
        }
    }

    [TestFixture]
    public class PropertyTraceTests
    {
        [Test]
        public void PropertyTrace_ShouldInitializeWithDefaultValues()
        {
            // Act
            var trace = new PropertyTrace();

            // Assert
            Assert.That(trace.Id, Is.Null);
            Assert.That(trace.IdPropertyTrace, Is.EqualTo(string.Empty));
            Assert.That(trace.DateSale, Is.EqualTo(default(DateTime)));
            Assert.That(trace.Name, Is.EqualTo(string.Empty));
            Assert.That(trace.Value, Is.EqualTo(0));
            Assert.That(trace.Tax, Is.EqualTo(0));
            Assert.That(trace.IdProperty, Is.EqualTo(string.Empty));
        }

        [Test]
        public void PropertyTrace_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var saleDate = DateTime.Parse("2024-06-15");

            // Act
            var trace = new PropertyTrace
            {
                Id = "TRC123",
                IdPropertyTrace = "TRC_INTERNAL_123",
                DateSale = saleDate,
                Name = "Venta inicial",
                Value = 400000000,
                Tax = 40000000,
                IdProperty = "PROP123"
            };

            // Assert
            Assert.That(trace.Id, Is.EqualTo("TRC123"));
            Assert.That(trace.IdPropertyTrace, Is.EqualTo("TRC_INTERNAL_123"));
            Assert.That(trace.DateSale, Is.EqualTo(saleDate));
            Assert.That(trace.Name, Is.EqualTo("Venta inicial"));
            Assert.That(trace.Value, Is.EqualTo(400000000));
            Assert.That(trace.Tax, Is.EqualTo(40000000));
            Assert.That(trace.IdProperty, Is.EqualTo("PROP123"));
        }

        [Test]
        public void PropertyTrace_ShouldHandleFinancialCalculations()
        {
            // Act
            var trace = new PropertyTrace
            {
                Name = "Venta con cálculos",
                Value = 500000000,
                Tax = 50000000 // 10% del valor
            };

            // Assert
            Assert.That(trace.Value, Is.EqualTo(500000000));
            Assert.That(trace.Tax, Is.EqualTo(50000000));
            // Verificar que el tax es exactamente 10% del valor
            Assert.That(trace.Tax, Is.EqualTo(trace.Value * 0.1m));
            // Verificar que el valor total (valor + tax) es correcto
            Assert.That(trace.Value + trace.Tax, Is.EqualTo(550000000));
        }

        [Test]
        public void PropertyTrace_ShouldHandleRecentSaleDate()
        {
            // Act
            var trace = new PropertyTrace
            {
                Name = "Venta reciente",
                DateSale = DateTime.Parse("2024-10-01")
            };

            // Assert
            Assert.That(trace.DateSale.Year, Is.EqualTo(2024));
            Assert.That(trace.DateSale.Month, Is.EqualTo(10));
            Assert.That(trace.DateSale, Is.LessThanOrEqualTo(DateTime.Now));
        }
    }

    [TestFixture]
    public class GeoLocationTests
    {
        [Test]
        public void GeoLocation_ShouldInitializeWithDefaultValues()
        {
            // Act
            var location = new GeoLocation();

            // Assert
            Assert.That(location.Lat, Is.EqualTo(0));
            Assert.That(location.Lng, Is.EqualTo(0));
        }

        [Test]
        public void GeoLocation_ShouldSetCoordinatesCorrectly()
        {
            // Act
            var location = new GeoLocation
            {
                Lat = 4.6097,
                Lng = -74.0817
            };

            // Assert
            Assert.That(location.Lat, Is.EqualTo(4.6097));
            Assert.That(location.Lng, Is.EqualTo(-74.0817));
        }

        [Test]
        public void GeoLocation_ShouldHandleBogotaCoordinates()
        {
            // Act
            var bogotaLocation = new GeoLocation
            {
                Lat = 4.6097,
                Lng = -74.0817
            };

            // Assert
            Assert.That(bogotaLocation.Lat, Is.GreaterThan(4));
            Assert.That(bogotaLocation.Lat, Is.LessThan(5));
            Assert.That(bogotaLocation.Lng, Is.LessThan(-74));
            Assert.That(bogotaLocation.Lng, Is.GreaterThan(-75));
        }

        [Test]
        public void GeoLocation_ShouldHandleMedellinCoordinates()
        {
            // Act
            var medellinLocation = new GeoLocation
            {
                Lat = 6.2442,
                Lng = -75.5812
            };

            // Assert
            Assert.That(medellinLocation.Lat, Is.GreaterThan(6));
            Assert.That(medellinLocation.Lat, Is.LessThan(7));
            Assert.That(medellinLocation.Lng, Is.LessThan(-75));
            Assert.That(medellinLocation.Lng, Is.GreaterThan(-76));
        }
    }

    [TestFixture]
    public class PropertyImageTests
    {
        [Test]
        public void PropertyImage_ShouldInitializeWithDefaultValues()
        {
            // Act
            var image = new PropertyImage();

            // Assert
            Assert.That(image.File, Is.EqualTo(string.Empty));
            Assert.That(image.Enabled, Is.True);
        }

        [Test]
        public void PropertyImage_ShouldSetPropertiesCorrectly()
        {
            // Act
            var image = new PropertyImage
            {
                File = "beautiful_house.jpg",
                Enabled = false
            };

            // Assert
            Assert.That(image.File, Is.EqualTo("beautiful_house.jpg"));
            Assert.That(image.Enabled, Is.False);
        }

        [Test]
        public void PropertyImage_ShouldHandleEnabledFlag()
        {
            // Act
            var enabledImage = new PropertyImage
            {
                File = "enabled_image.jpg",
                Enabled = true
            };

            var disabledImage = new PropertyImage
            {
                File = "disabled_image.jpg",
                Enabled = false
            };

            // Assert
            Assert.That(enabledImage.Enabled, Is.True);
            Assert.That(disabledImage.Enabled, Is.False);
            Assert.That(enabledImage.File, Is.Not.Empty);
            Assert.That(disabledImage.File, Is.Not.Empty);
        }

        [Test]
        public void PropertyImage_ShouldHandleS3Urls()
        {
            // Act
            var image = new PropertyImage
            {
                File = "https://s3.amazonaws.com/bucket/property-images/house123.jpg"
            };

            // Assert
            Assert.That(image.File, Does.StartWith("https://"));
            Assert.That(image.File, Does.Contain("s3.amazonaws.com"));
            Assert.That(image.File, Does.EndWith(".jpg"));
        }
    }
}
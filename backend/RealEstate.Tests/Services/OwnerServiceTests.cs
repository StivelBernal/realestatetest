using NUnit.Framework;
using Moq;
using RealEstate.Api.Services;
using RealEstate.Api.Models;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace RealEstate.Tests.Services
{
    [TestFixture]
    public class OwnerServiceTests
    {
        private Mock<IMongoDatabase> _mockDatabase;
        private Mock<IMongoCollection<Owner>> _mockCollection;
        private Mock<IAsyncCursor<Owner>> _mockCursor;
        private OwnerService _ownerService;

        [SetUp]
        public void SetUp()
        {
            _mockDatabase = new Mock<IMongoDatabase>();
            _mockCollection = new Mock<IMongoCollection<Owner>>();
            _mockCursor = new Mock<IAsyncCursor<Owner>>();

            // Configurar el mock de database para retornar la colección
            _mockDatabase.Setup(d => d.GetCollection<Owner>("owners", null))
                .Returns(_mockCollection.Object);

            _ownerService = new OwnerService(_mockDatabase.Object);
        }

        [Test]
        public async Task GetAllAsync_ShouldReturnAllOwners()
        {
            // Arrange
            var expectedOwners = new List<Owner>
            {
                new Owner { Id = "1", IdOwner = "OWN001", Name = "Juan Pérez", Address = "Calle 123", Birthday = DateTime.Parse("1980-01-01") },
                new Owner { Id = "2", IdOwner = "OWN002", Name = "María García", Address = "Carrera 456", Birthday = DateTime.Parse("1985-05-15") }
            };

            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(true)
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(true))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(expectedOwners);

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Owner>>(),
                It.IsAny<FindOptions<Owner>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _ownerService.GetAllAsync();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].Name, Is.EqualTo("Juan Pérez"));
            Assert.That(result[1].Name, Is.EqualTo("María García"));
        }

        [Test]
        public async Task GetByOwnerIdAsync_WithValidId_ShouldReturnOwner()
        {
            // Arrange
            var expectedOwner = new Owner 
            { 
                Id = "1", 
                IdOwner = "OWN001", 
                Name = "Juan Pérez", 
                Address = "Calle 123",
                Birthday = DateTime.Parse("1980-01-01"),
                CreatedAt = DateTime.UtcNow
            };

            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(true)
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(true))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(new List<Owner> { expectedOwner });

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Owner>>(),
                It.IsAny<FindOptions<Owner>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _ownerService.GetByOwnerIdAsync("OWN001");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.IdOwner, Is.EqualTo("OWN001"));
            Assert.That(result.Name, Is.EqualTo("Juan Pérez"));
            Assert.That(result.Address, Is.EqualTo("Calle 123"));
        }

        [Test]
        public async Task GetByOwnerIdAsync_WithInvalidId_ShouldReturnNull()
        {
            // Arrange
            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(new List<Owner>());

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Owner>>(),
                It.IsAny<FindOptions<Owner>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _ownerService.GetByOwnerIdAsync("INVALID_ID");

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task CreateAsync_WithValidOwner_ShouldCreateOwnerSuccessfully()
        {
            // Arrange
            var newOwner = new Owner
            {
                Name = "Carlos Rodríguez",
                Address = "Avenida 789",
                Birthday = DateTime.Parse("1990-12-25"),
                Photo = "photo.jpg"
            };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<Owner>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _ownerService.CreateAsync(newOwner);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo("Carlos Rodríguez"));
            Assert.That(result.Address, Is.EqualTo("Avenida 789"));
            Assert.That(result.IdOwner, Is.Not.Empty);
            Assert.That(result.IdOwner, Does.StartWith("OWN"));
            Assert.That(result.CreatedAt, Is.Not.EqualTo(default(DateTime)));
            Assert.That(result.UpdatedAt, Is.Not.EqualTo(default(DateTime)));

            // Verificar que se llamó InsertOneAsync
            _mockCollection.Verify(c => c.InsertOneAsync(
                It.IsAny<Owner>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test]
        public async Task CreateAsync_WithExistingIdOwner_ShouldKeepExistingId()
        {
            // Arrange
            var newOwner = new Owner
            {
                IdOwner = "CUSTOM_ID",
                Name = "Ana López",
                Address = "Plaza 321",
                Birthday = DateTime.Parse("1988-08-20")
            };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<Owner>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _ownerService.CreateAsync(newOwner);

            // Assert
            Assert.That(result.IdOwner, Is.EqualTo("CUSTOM_ID"));
            Assert.That(result.Name, Is.EqualTo("Ana López"));
            Assert.That(result.Address, Is.EqualTo("Plaza 321"));
        }

        [Test]
        public async Task CreateAsync_ShouldGenerateUniqueIdOwnerFormat()
        {
            // Arrange
            var owner1 = new Owner { Name = "Owner 1", Address = "Address 1", Birthday = DateTime.Now };
            var owner2 = new Owner { Name = "Owner 2", Address = "Address 2", Birthday = DateTime.Now };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<Owner>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result1 = await _ownerService.CreateAsync(owner1);
            var result2 = await _ownerService.CreateAsync(owner2);

            // Assert
            Assert.That(result1.IdOwner, Does.Match(@"^OWN\d{8}\d{4}$"));
            Assert.That(result2.IdOwner, Does.Match(@"^OWN\d{8}\d{4}$"));
            // Los IDs deberían ser diferentes (muy probable con números aleatorios)
            Assert.That(result1.IdOwner, Is.Not.EqualTo(result2.IdOwner));
        }

        [Test]
        public void CreateAsync_ShouldSetCreatedAndUpdatedDates()
        {
            // Arrange
            var owner = new Owner
            {
                Name = "Test Owner",
                Address = "Test Address",
                Birthday = DateTime.Parse("1985-01-01")
            };

            var beforeCreation = DateTime.UtcNow.AddSeconds(-1);

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<Owner>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = _ownerService.CreateAsync(owner).Result;
            var afterCreation = DateTime.UtcNow.AddSeconds(1);

            // Assert
            Assert.That(result.CreatedAt, Is.GreaterThan(beforeCreation));
            Assert.That(result.CreatedAt, Is.LessThan(afterCreation));
            Assert.That(result.UpdatedAt, Is.GreaterThan(beforeCreation));
            Assert.That(result.UpdatedAt, Is.LessThan(afterCreation));
            Assert.That(result.CreatedAt, Is.EqualTo(result.UpdatedAt).Within(TimeSpan.FromSeconds(1)));
        }

        [Test]
        public async Task CreateAsync_WithEmptyName_ShouldStillCreateOwner()
        {
            // Arrange
            var owner = new Owner
            {
                Name = "",
                Address = "Test Address",
                Birthday = DateTime.Parse("1985-01-01")
            };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<Owner>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act & Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                var result = await _ownerService.CreateAsync(owner);
                Assert.That(result.Name, Is.EqualTo(""));
                Assert.That(result.IdOwner, Is.Not.Empty);
            });
        }
    }
}
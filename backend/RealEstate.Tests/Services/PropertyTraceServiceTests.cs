using NUnit.Framework;
using Moq;
using RealEstate.Api.Services;
using RealEstate.Api.Models;
using MongoDB.Driver;

namespace RealEstate.Tests.Services
{
    [TestFixture]
    public class PropertyTraceServiceTests
    {
        private Mock<IMongoDatabase> _mockDatabase;
        private Mock<IMongoCollection<PropertyTrace>> _mockCollection;
        private Mock<IAsyncCursor<PropertyTrace>> _mockCursor;
        private PropertyTraceService _propertyTraceService;

        [SetUp]
        public void SetUp()
        {
            _mockDatabase = new Mock<IMongoDatabase>();
            _mockCollection = new Mock<IMongoCollection<PropertyTrace>>();
            _mockCursor = new Mock<IAsyncCursor<PropertyTrace>>();

            // Configurar el mock de database para retornar la colección
            _mockDatabase.Setup(d => d.GetCollection<PropertyTrace>("propertytraces", null))
                .Returns(_mockCollection.Object);

            _propertyTraceService = new PropertyTraceService(_mockDatabase.Object);
        }

        [Test]
        public async Task GetAllAsync_ShouldReturnAllPropertyTraces()
        {
            // Arrange
            var expectedTraces = new List<PropertyTrace>
            {
                new PropertyTrace 
                { 
                    Id = "1", 
                    IdPropertyTrace = "TRC001", 
                    Name = "Venta inicial",
                    Value = 500000000,
                    Tax = 50000000,
                    IdProperty = "PROP001",
                    DateSale = DateTime.Parse("2024-01-15")
                },
                new PropertyTrace 
                { 
                    Id = "2", 
                    IdPropertyTrace = "TRC002", 
                    Name = "Venta secundaria",
                    Value = 600000000,
                    Tax = 60000000,
                    IdProperty = "PROP002",
                    DateSale = DateTime.Parse("2024-02-20")
                }
            };

            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(true)
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(true))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(expectedTraces);

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<PropertyTrace>>(),
                It.IsAny<FindOptions<PropertyTrace>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _propertyTraceService.GetAllAsync();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].Name, Is.EqualTo("Venta inicial"));
            Assert.That(result[1].Name, Is.EqualTo("Venta secundaria"));
            Assert.That(result[0].Value, Is.EqualTo(500000000));
            Assert.That(result[1].Value, Is.EqualTo(600000000));
        }

        [Test]
        public async Task GetByIdAsync_WithValidId_ShouldReturnPropertyTrace()
        {
            // Arrange
            var expectedTrace = new PropertyTrace
            {
                Id = "1",
                IdPropertyTrace = "TRC001",
                Name = "Venta principal",
                Value = 450000000,
                Tax = 45000000,
                IdProperty = "PROP001",
                DateSale = DateTime.Parse("2024-03-10"),
                CreatedAt = DateTime.UtcNow
            };

            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(true)
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(true))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(new List<PropertyTrace> { expectedTrace });

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<PropertyTrace>>(),
                It.IsAny<FindOptions<PropertyTrace>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _propertyTraceService.GetByIdAsync("1");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.IdPropertyTrace, Is.EqualTo("TRC001"));
            Assert.That(result.Name, Is.EqualTo("Venta principal"));
            Assert.That(result.Value, Is.EqualTo(450000000));
            Assert.That(result.Tax, Is.EqualTo(45000000));
            Assert.That(result.IdProperty, Is.EqualTo("PROP001"));
        }

        [Test]
        public async Task GetByIdAsync_WithInvalidId_ShouldReturnNull()
        {
            // Arrange
            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(new List<PropertyTrace>());

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<PropertyTrace>>(),
                It.IsAny<FindOptions<PropertyTrace>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _propertyTraceService.GetByIdAsync("INVALID_ID");

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task GetByPropertyIdAsync_WithValidPropertyId_ShouldReturnPropertyTraces()
        {
            // Arrange
            var expectedTraces = new List<PropertyTrace>
            {
                new PropertyTrace 
                { 
                    Id = "1", 
                    IdPropertyTrace = "TRC001", 
                    Name = "Primera venta",
                    Value = 400000000,
                    Tax = 40000000,
                    IdProperty = "PROP001",
                    DateSale = DateTime.Parse("2023-12-01")
                },
                new PropertyTrace 
                { 
                    Id = "2", 
                    IdPropertyTrace = "TRC002", 
                    Name = "Segunda venta",
                    Value = 480000000,
                    Tax = 48000000,
                    IdProperty = "PROP001",
                    DateSale = DateTime.Parse("2024-06-15")
                }
            };

            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(true)
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(true))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(expectedTraces);

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<PropertyTrace>>(),
                It.IsAny<FindOptions<PropertyTrace>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _propertyTraceService.GetByPropertyIdAsync("PROP001");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result.All(t => t.IdProperty == "PROP001"), Is.True);
            Assert.That(result[0].Name, Is.EqualTo("Primera venta"));
            Assert.That(result[1].Name, Is.EqualTo("Segunda venta"));
            Assert.That(result[1].Value, Is.GreaterThan(result[0].Value)); // Segunda venta más cara
        }

        [Test]
        public async Task GetByPropertyIdAsync_WithInvalidPropertyId_ShouldReturnEmptyList()
        {
            // Arrange
            _mockCursor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                .Returns(false);
            _mockCursor.SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(false));
            _mockCursor.Setup(c => c.Current).Returns(new List<PropertyTrace>());

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<PropertyTrace>>(),
                It.IsAny<FindOptions<PropertyTrace>>(),
                It.IsAny<CancellationToken>()))
                .ReturnsAsync(_mockCursor.Object);

            // Act
            var result = await _propertyTraceService.GetByPropertyIdAsync("NONEXISTENT_PROP");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task CreateAsync_WithValidPropertyTrace_ShouldCreateSuccessfully()
        {
            // Arrange
            var newTrace = new PropertyTrace
            {
                Name = "Nueva venta",
                Value = 520000000,
                Tax = 52000000,
                IdProperty = "PROP003",
                DateSale = DateTime.Parse("2024-10-01")
            };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<PropertyTrace>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _propertyTraceService.CreateAsync(newTrace);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo("Nueva venta"));
            Assert.That(result.Value, Is.EqualTo(520000000));
            Assert.That(result.Tax, Is.EqualTo(52000000));
            Assert.That(result.IdProperty, Is.EqualTo("PROP003"));
            Assert.That(result.IdPropertyTrace, Is.Not.Empty);
            Assert.That(result.IdPropertyTrace, Does.StartWith("TRC"));
            Assert.That(result.CreatedAt, Is.Not.EqualTo(default(DateTime)));
            Assert.That(result.UpdatedAt, Is.Not.EqualTo(default(DateTime)));

            // Verificar que se llamó InsertOneAsync
            _mockCollection.Verify(c => c.InsertOneAsync(
                It.IsAny<PropertyTrace>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()), Times.Once);
        }

        [Test]
        public async Task CreateAsync_WithExistingIdPropertyTrace_ShouldKeepExistingId()
        {
            // Arrange
            var newTrace = new PropertyTrace
            {
                IdPropertyTrace = "CUSTOM_TRC_ID",
                Name = "Venta personalizada",
                Value = 380000000,
                Tax = 38000000,
                IdProperty = "PROP004",
                DateSale = DateTime.Parse("2024-11-01")
            };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<PropertyTrace>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _propertyTraceService.CreateAsync(newTrace);

            // Assert
            Assert.That(result.IdPropertyTrace, Is.EqualTo("CUSTOM_TRC_ID"));
            Assert.That(result.Name, Is.EqualTo("Venta personalizada"));
            Assert.That(result.Value, Is.EqualTo(380000000));
        }

        [Test]
        public async Task CreateAsync_ShouldGenerateUniqueIdPropertyTraceFormat()
        {
            // Arrange
            var trace1 = new PropertyTrace { Name = "Trace 1", Value = 100000, Tax = 10000, IdProperty = "PROP1", DateSale = DateTime.Now };
            var trace2 = new PropertyTrace { Name = "Trace 2", Value = 200000, Tax = 20000, IdProperty = "PROP2", DateSale = DateTime.Now };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<PropertyTrace>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result1 = await _propertyTraceService.CreateAsync(trace1);
            var result2 = await _propertyTraceService.CreateAsync(trace2);

            // Assert
            Assert.That(result1.IdPropertyTrace, Does.Match(@"^TRC\d{8}\d{4}$"));
            Assert.That(result2.IdPropertyTrace, Does.Match(@"^TRC\d{8}\d{4}$"));
            // Los IDs deberían ser diferentes (muy probable con números aleatorios)
            Assert.That(result1.IdPropertyTrace, Is.Not.EqualTo(result2.IdPropertyTrace));
        }

        [Test]
        public void CreateAsync_ShouldSetCreatedAndUpdatedDates()
        {
            // Arrange
            var trace = new PropertyTrace
            {
                Name = "Test Trace",
                Value = 300000000,
                Tax = 30000000,
                IdProperty = "TEST_PROP",
                DateSale = DateTime.Parse("2024-01-01")
            };

            var beforeCreation = DateTime.UtcNow.AddSeconds(-1);

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<PropertyTrace>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = _propertyTraceService.CreateAsync(trace).Result;
            var afterCreation = DateTime.UtcNow.AddSeconds(1);

            // Assert
            Assert.That(result.CreatedAt, Is.GreaterThan(beforeCreation));
            Assert.That(result.CreatedAt, Is.LessThan(afterCreation));
            Assert.That(result.UpdatedAt, Is.GreaterThan(beforeCreation));
            Assert.That(result.UpdatedAt, Is.LessThan(afterCreation));
            Assert.That(result.CreatedAt, Is.EqualTo(result.UpdatedAt).Within(TimeSpan.FromSeconds(1)));
        }

        [Test]
        public async Task CreateAsync_WithValidFinancialData_ShouldCalculateCorrectly()
        {
            // Arrange
            var trace = new PropertyTrace
            {
                Name = "Venta con cálculos",
                Value = 500000000, // 500 millones
                Tax = 50000000,    // 50 millones (10%)
                IdProperty = "PROP_CALC",
                DateSale = DateTime.Parse("2024-12-01")
            };

            _mockCollection.Setup(c => c.InsertOneAsync(
                It.IsAny<PropertyTrace>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _propertyTraceService.CreateAsync(trace);

            // Assert
            Assert.That(result.Value, Is.EqualTo(500000000));
            Assert.That(result.Tax, Is.EqualTo(50000000));
            // Verificar que el tax es 10% del valor
            Assert.That(result.Tax, Is.EqualTo(result.Value * 0.1m));
        }
    }
}
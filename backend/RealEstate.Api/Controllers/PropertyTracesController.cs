using Microsoft.AspNetCore.Mvc;
using RealEstate.Api.DTOs;
using RealEstate.Api.Interfaces;
using RealEstate.Api.Models;

namespace RealEstate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyTracesController : ControllerBase
    {
        private readonly IPropertyTraceService _propertyTraceService;

        public PropertyTracesController(IPropertyTraceService propertyTraceService)
        {
            _propertyTraceService = propertyTraceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyTraceDto>>> GetAll()
        {
            var traces = await _propertyTraceService.GetAllAsync();
            var traceDtos = traces.Select(pt => new PropertyTraceDto
            {
                Id = pt.Id!,
                IdPropertyTrace = pt.IdPropertyTrace,
                DateSale = pt.DateSale,
                Name = pt.Name,
                Value = pt.Value,
                Tax = pt.Tax,
                CreatedAt = pt.CreatedAt,
                UpdatedAt = pt.UpdatedAt
            });

            return Ok(traceDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyTraceDto>> GetById(string id)
        {
            var trace = await _propertyTraceService.GetByIdAsync(id);
            if (trace == null)
                return NotFound();

            var traceDto = new PropertyTraceDto
            {
                Id = trace.Id!,
                IdPropertyTrace = trace.IdPropertyTrace,
                DateSale = trace.DateSale,
                Name = trace.Name,
                Value = trace.Value,
                Tax = trace.Tax,
                CreatedAt = trace.CreatedAt,
                UpdatedAt = trace.UpdatedAt
            };

            return Ok(traceDto);
        }

        [HttpPost]
        public async Task<ActionResult<PropertyTraceDto>> Create(CreatePropertyTraceDto dto)
        {
            var trace = new PropertyTrace
            {
                DateSale = dto.DateSale,
                Name = dto.Name,
                Value = dto.Value,
                Tax = dto.Tax,
                IdProperty = dto.IdProperty
            };

            var createdTrace = await _propertyTraceService.CreateAsync(trace);
            
            var traceDto = new PropertyTraceDto
            {
                Id = createdTrace.Id!,
                IdPropertyTrace = createdTrace.IdPropertyTrace,
                DateSale = createdTrace.DateSale,
                Name = createdTrace.Name,
                Value = createdTrace.Value,
                Tax = createdTrace.Tax,
                CreatedAt = createdTrace.CreatedAt,
                UpdatedAt = createdTrace.UpdatedAt
            };

            return Ok(traceDto);
        }
    }

    public class CreatePropertyTraceDto
    {
        public DateTime DateSale { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public decimal Tax { get; set; }
        public string IdProperty { get; set; } = string.Empty;
    }
}
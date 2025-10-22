using Microsoft.AspNetCore.Mvc;
using RealEstate.Api.Interfaces;
using RealEstate.Api.Services;
using RealEstate.Api.Models;
using RealEstate.Api.DTOs;


namespace RealEstate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _service;
        private readonly S3Service _s3Service;

        public PropertiesController(IPropertyService service, S3Service s3Service)
        {
            _service = service;
            _s3Service = s3Service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? name, [FromQuery] string? address,
                                               [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
        {
            var properties = await _service.GetAllAsync(name, address, minPrice, maxPrice);
            return Ok(properties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var property = await _service.GetByIdAsync(id);
            if (property == null) return NotFound();
            return Ok(property);
        }

        [HttpGet("{id}/detail")]
        public async Task<IActionResult> GetDetailById(string id)
        {
            var propertyDetail = await _service.GetDetailByIdAsync(id);
            if (propertyDetail == null) return NotFound();
            return Ok(propertyDetail);
        }
   
        // Subir imagen(s) de galería (multipart/form-data)
        [HttpPost("{id}/gallery")]
        public async Task<IActionResult> UploadGallery(string id, [FromForm] List<IFormFile> files)
        {
            if (files == null || !files.Any()) return BadRequest("No files provided");

            var property = await _service.GetModelByIdAsync(id);
            if (property == null) return NotFound();

            var urls = new List<string>();
            foreach (var file in files)
            {
                var url = await _s3Service.UploadFileAsync(file);
                property.Images.Add(new PropertyImage { File = url, Enabled = true });
                urls.Add(url);
            }

            await _service.UpdateAsync(id, property);

            return Ok(new { Added = urls, PropertyId = id });
        }

        // Subir/actualizar imagen portada (single file)
        [HttpPost("{id}/cover")]
        public async Task<IActionResult> UploadCover(string id, [FromForm] IFormFile file)
        {
            if (file == null) return BadRequest("No file provided");

            var property = await _service.GetModelByIdAsync(id);
            if (property == null) return NotFound();

            var url = await _s3Service.UploadFileAsync(file);
            property.Image = url;
            await _service.UpdateAsync(id, property);

            return Ok(new { Cover = url, PropertyId = id });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePropertyDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

    }


}

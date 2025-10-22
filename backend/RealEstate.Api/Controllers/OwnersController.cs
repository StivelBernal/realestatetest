using Microsoft.AspNetCore.Mvc;
using RealEstate.Api.DTOs;
using RealEstate.Api.Interfaces;
using RealEstate.Api.Models;

namespace RealEstate.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OwnersController : ControllerBase
    {
        private readonly IOwnerService _ownerService;

        public OwnersController(IOwnerService ownerService)
        {
            _ownerService = ownerService;
        }

        [HttpPost]
        public async Task<ActionResult<OwnerDto>> Create(CreateOwnerDto dto)
        {
            var owner = new Owner
            {
                Name = dto.Name,
                Address = dto.Address,
                Photo = dto.Photo ?? string.Empty,
                Birthday = dto.Birthday
            };

            var createdOwner = await _ownerService.CreateAsync(owner);
            
            var ownerDto = new OwnerDto
            {
                Id = createdOwner.Id!,
                IdOwner = createdOwner.IdOwner,
                Name = createdOwner.Name,
                Address = createdOwner.Address,
                Photo = createdOwner.Photo,
                Birthday = createdOwner.Birthday,
                CreatedAt = createdOwner.CreatedAt,
                UpdatedAt = createdOwner.UpdatedAt
            };

            return Ok(ownerDto);
        }
    }

    public class CreateOwnerDto
    {
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Photo { get; set; }
        public DateTime Birthday { get; set; }
    }
}
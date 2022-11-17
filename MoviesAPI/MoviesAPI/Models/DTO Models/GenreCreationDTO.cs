using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models.DTO_Models
{
    public class GenreCreationDTO
    {
        [Required]
        public string Name { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Models
{
    public class Genre
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}

using MoviesAPI.Models;

namespace MoviesAPI.Repository.IRepository
{
   public interface IGenreRepository : IRepository<Genre>
    {
        void Update(Genre obj);
    }
}

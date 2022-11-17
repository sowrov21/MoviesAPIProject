using MoviesAPI.Models;

namespace MoviesAPI.Repository.IRepository
{
    public interface IActorRepository : IRepository<Actor>
    {
        void Update(Actor obj);
    }
}

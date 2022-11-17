using MoviesAPI.Data;
using MoviesAPI.Models;
using MoviesAPI.Repository.IRepository;

namespace MoviesAPI.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            Genre = new GenreRepository(dbContext);
            Actor = new ActorRepository(dbContext);
        }
        public IGenreRepository Genre { get; private set; }
        public IActorRepository Actor { get; private set; }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}

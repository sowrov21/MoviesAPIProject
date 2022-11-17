namespace MoviesAPI.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IGenreRepository Genre { get; }
        IActorRepository Actor { get; }

        void Save();
    }
}

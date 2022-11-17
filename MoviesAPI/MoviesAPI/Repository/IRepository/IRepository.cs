using System.Linq.Expressions;

namespace MoviesAPI.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(string? includeProperties = null);
        Task<IEnumerable<T>> GetAllAsync();
        void Add(T entity);
        void AddAsync(T entity);
        void AddRange(IEnumerable<T> entity);
        void AddRangeAsync(IEnumerable<T> entity);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entity);
        T GetFirstOrDefault(Expression<Func<T, bool>> filter, string? includeProperties = null);
        Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter, string? includeProperties = null);
    }
}

using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.Repository.IRepository;

namespace MoviesAPI.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext _dbContext;
        internal DbSet<T> dbSet;
        public Repository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            // _dbContext.Products.Include(c => c.Category);
            this.dbSet = _dbContext.Set<T>();
        }
        public void Add(T entity)
        {
            this.dbSet.Add(entity);
        }
        public void AddAsync(T entity)
        {
            this.dbSet.AddAsync(entity);
        }
        public void AddRange(IEnumerable<T> entity)
        {
            this.dbSet.AddRange(entity);
        }

        public void AddRangeAsync(IEnumerable<T> entity)
        {
            this.dbSet.AddRangeAsync(entity);
        }



        public IEnumerable<T> GetAll(string? includeProperties = null)
        {
            IQueryable<T> query = this.dbSet;
            if (includeProperties != null)
            {
                foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp);
                }
            }
            return query.ToList();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await this.dbSet.ToListAsync();
        }


        public T GetFirstOrDefault(System.Linq.Expressions.Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query = this.dbSet;
            query = query.Where(filter);
            if (includeProperties != null)
            {
                foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp);
                }
            }
            return query.FirstOrDefault();
        }

        public Task<T> GetFirstOrDefaultAsync(System.Linq.Expressions.Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query = this.dbSet;
            query = query.Where(filter);
            if (includeProperties != null)
            {
                foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp);
                }
            }
            return query.FirstOrDefaultAsync();
        }

        public void Remove(T entity)
        {
            this.dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entity)
        {
            this.dbSet.RemoveRange(entity);
        }

    }
}

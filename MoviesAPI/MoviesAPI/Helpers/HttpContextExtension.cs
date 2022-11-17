using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace MoviesAPI.Helpers
{
    public static class HttpContextExtension
    {
        public static void InsertParametersPaginationHeader <T> (this HttpContext httpcontext,
          IQueryable<T> queryable)
        {
            if(httpcontext == null) { throw new ArgumentNullException (nameof (httpcontext)); }
            double count =  queryable.Count();
            httpcontext.Response.Headers.Add("totalAmountOfRecords",count.ToString());
        }
    }
}

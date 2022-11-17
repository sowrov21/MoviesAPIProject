namespace MoviesAPI.Helpers
{
    public interface IFileStorageService
    {
      void  DeleteFile(string fileRoute, string container);
       string SaveFile(string containerName, IFormFile file);
       string EditFile(string containerName, IFormFile file, string fileRoute);
    }
}

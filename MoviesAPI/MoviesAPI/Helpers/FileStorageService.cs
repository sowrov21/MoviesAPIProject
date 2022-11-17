namespace MoviesAPI.Helpers
{
    public class FileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;

        public FileStorageService(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
        }
        public void DeleteFile(string fileRoute, string containerName)
        {
            if(string.IsNullOrEmpty(fileRoute))
            {
                return;
            }
            var fileName = Path.GetFileName(fileRoute);
            var fileDirectory = Path.Combine(env.WebRootPath, containerName, fileName);

            if(File.Exists(fileDirectory))
            {
                File.Delete(fileDirectory);
            }
            return;
        }


        public string EditFile(string containerName, IFormFile file, string fileRoute)
        {
            DeleteFile(fileRoute, containerName);
            return SaveFile(containerName, file);
        }

        public string SaveFile(string containerName, IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(env.WebRootPath, containerName);

            if(!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            string route = Path.Combine(folder, fileName);

            using (var ms = new MemoryStream()) 
            {
                file.CopyTo(ms);
               var content = ms.ToArray();
                File.WriteAllBytes(route, content);
            }

            var url = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            var routeForDb = Path.Combine(url, containerName, fileName).Replace("\\","/");
            return routeForDb;


        }
    }
}

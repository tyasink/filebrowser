using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FileBrowser.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrowseController : ControllerBase
    {
        private readonly ILogger<BrowseController> _logger;

        public BrowseController(ILogger<BrowseController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public object Get(string path, int skip = 0, int take = 10)
        {
            const string baseDir = "./AppData/";

            // prevent going beyond root folder
            path = (path ?? "").Replace("..", "");

            var directories = Directory
                                .GetDirectories(baseDir + path)
                                .Select(x => new DirectoryInfo(x))
                                .Select(x => new
                                {
                                    IsDirectory = true,
                                    x.Name,
                                    Length = (long)0,
                                    x.CreationTime,
                                    x.LastAccessTime,
                                    x.LastWriteTime,
                                });

            var files = Directory
                            .GetFiles(baseDir + path)
                            .Select(x => new FileInfo(x))
                            .Select(x => new
                            {
                                IsDirectory = false,
                                x.Name,
                                x.Length,
                                x.CreationTime,
                                x.LastAccessTime,
                                x.LastWriteTime,
                            });

            var dirsAndFiles = directories.Concat(files);

            return new
            {
                count = dirsAndFiles.Count(),
                items = dirsAndFiles.Skip(skip).Take(take)
            };
        }
    }
}

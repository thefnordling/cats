using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Ui.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatsController : ControllerBase
    {
        private Cache Cache { get; set; }
        private CatRepository Repo { get; set; }
        public CatsController(Cache cache, CatRepository repo)
        {
            this.Cache = cache;
            this.Repo = repo;
        }
        [HttpGet]
        [Route("~/api/Cats")]
        public ActionResult<IEnumerable<Cat>> Get()
        {
            return Ok(this.Cache.Get());
        }
        [HttpPost]
        [Route("~/api/Cats")]
        public ActionResult<Cat> InsertUpdate(Cat c)
        {
            if (string.IsNullOrEmpty(c.Id))
                c.Id = Guid.NewGuid().ToString();

            this.Repo.Insert(c);
            this.Cache.Insert(c);
            return Ok(c);
        }
        [HttpDelete]
        [Route("~/api/Cats")]
        public ActionResult<Cat> Delete(Cat c)
        {
            this.Repo.Delete(c);
            this.Cache.Delete(c);
            return c;
        }
    }
}
using Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Services
{
    public class Cache : IRepository<Cat>
    {
        private ConcurrentDictionary<string, Cat> Cats { get; set; } = new ConcurrentDictionary<string, Cat>(StringComparer.OrdinalIgnoreCase);
        public Cache(CatRepository repo)
        {
            repo.Get().ToList().ForEach(c => this.Insert(c));
        }
        public Cat Delete(Cat item)
        {
            this.Cats.TryRemove(item.Id, out Cat match);
            return match;
        }

        public IEnumerable<Cat> Get()
        {
            return this.Cats.Values;
        }

        public Cat Insert(Cat item)
        {
            return this.Cats.AddOrOverwrite(item.Id, item);
        }

        public Cat Update(Cat item)
        {
            return this.Cats.AddOrOverwrite(item.Id, item);
        }
    }
}

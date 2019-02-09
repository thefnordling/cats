using Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class CatRepository : IRepository<Cat>
    {
        protected ConcurrentDictionary<string, Cat> Cats { get; set; } = new ConcurrentDictionary<string, Cat>(StringComparer.OrdinalIgnoreCase);
        public CatRepository()
        {
            var barry = new Cat()
            {
                Birth = new DateTimeOffset(2015, 11, 13, 4, 2, 2, TimeZone.CurrentTimeZone.GetUtcOffset());
        }
    }
    public Cat Delete(Cat item)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Cat> Get()
    {
        throw new NotImplementedException();
    }

    public Cat Insert(Cat item)
    {
        throw new NotImplementedException();
    }

    public Cat Update(Cat item)
    {
        throw new NotImplementedException();
    }
}
}

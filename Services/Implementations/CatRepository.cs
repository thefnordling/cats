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
        protected ITimestampFactory TimestampFactory { get; set; } = new LocalTimestampFactory();

        public CatRepository()
        {
            var barry = new Cat()
            {
                Birth = TimestampFactory.GetTimestamp(new DateTime(2017, 11, 5, 3, 45, 0)),
                Hungry = false,
                Mood = Mood.Amber,
                Id = Guid.NewGuid().ToString(),
                Name = "Barry"
            };

            var doug = new Cat()
            {
                Birth = TimestampFactory.GetTimestamp(new DateTime(2018, 5, 4, 13, 25, 13)),
                Hungry = true,
                Mood = Mood.Red,
                Id = Guid.NewGuid().ToString(),
                Name = "Doug"
            };

            var fluffy = new Cat()
            {
                Birth = TimestampFactory.GetTimestamp(new DateTime(2010, 2, 19, 4, 15, 25)),
                Hungry = false,
                Mood = Mood.Green,
                Id = Guid.NewGuid().ToString(),
                Name = "Fluffy"
            };

            Cats.AddOrOverwrite(barry.Id, barry);
            Cats.AddOrOverwrite(doug.Id, doug);
            Cats.AddOrOverwrite(fluffy.Id, fluffy);
        }
        public Cat Delete(Cat item)
        {
            if (this.Cats.TryRemove(item.Id, out Cat removed))
                return removed;
            else
                return null;
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

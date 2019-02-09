using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Services;
using Models;
using System.Linq;

namespace Services.Tests
{
    public class Cache
    {
        [Fact]
        public void InsertUpdate()
        {
            var cache = new Services.Cache(new Services.CatRepository());

            var subject1 = new Cat()
            {
                Id = Guid.NewGuid().ToString(),
                Birth = new DateTimeOffset(2015, 2, 22, 4, 55, 0, TimeZoneInfo.Utc.BaseUtcOffset),
                Hungry = true,
                Mood = Mood.Amber,
                Name = "canary"
            };

            var subject2 = new Cat()
            {
                Id = subject1.Id.ToLower(),
                Birth = new DateTimeOffset(2015, 2, 22, 4, 55, 0, TimeZoneInfo.Utc.BaseUtcOffset),
                Hungry = true,
                Mood = Mood.Amber,
                Name = "guineapig"
            };

            var comparer = new CatComparer();
            var result1 = cache.Insert(subject1);
            Assert.NotNull(result1);
            Assert.True(comparer.Equals(subject1, result1));

            var result2 = cache.Update(subject2);
            Assert.NotNull(result2);

            var result3 = cache.Get().FirstOrDefault(c => comparer.Equals(subject2, c));
            Assert.NotNull(result3);
            Assert.True(comparer.Equals(subject2, result3));
        }

        [Fact]
        public void Delete()
        {
            var cache = new Services.Cache(new Services.CatRepository());

            var subject1 = new Cat()
            {
                Id = Guid.NewGuid().ToString(),
                Birth = new DateTimeOffset(2015, 2, 22, 4, 55, 0, TimeZoneInfo.Utc.BaseUtcOffset),
                Hungry = true,
                Mood = Mood.Amber,
                Name = "canary"
            };
            var comparer = new CatComparer();

            cache.Insert(subject1);
            var result1 = cache.Get().FirstOrDefault(c => comparer.Equals(subject1, c));
            Assert.NotNull(result1);

            cache.Delete(subject1);
            var result2 = cache.Get().FirstOrDefault(c => comparer.Equals(subject1, c));
            Assert.Null(result2);

        }
    }
}

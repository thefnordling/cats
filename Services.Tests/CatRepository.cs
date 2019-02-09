using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Services;
using Models;
using System.Linq;

namespace Services.Tests
{
    public class CatRepository
    {
        [Fact]
        public void InsertUpdate()
        {
            var repo = new Services.CatRepository();
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
            var result1 = repo.Insert(subject1);
            Assert.NotNull(result1);
            Assert.True(comparer.Equals(subject1, result1));

            var result2 = repo.Update(subject2);
            Assert.NotNull(result2);

            var result3 = repo.Get().FirstOrDefault(c => comparer.Equals(subject2, c));
            Assert.NotNull(result3);
            Assert.True(comparer.Equals(subject2, result3));
        }

        [Fact]
        public void Delete()
        {
            var repo = new Services.CatRepository();
            var subject1 = new Cat()
            {
                Id = Guid.NewGuid().ToString(),
                Birth = new DateTimeOffset(2015, 2, 22, 4, 55, 0, TimeZoneInfo.Utc.BaseUtcOffset),
                Hungry = true,
                Mood = Mood.Amber,
                Name = "canary"
            };
            var comparer = new CatComparer();

            repo.Insert(subject1);
            var result1 = repo.Get().FirstOrDefault(c => comparer.Equals(subject1, c));
            Assert.NotNull(result1);

            repo.Delete(subject1);
            var result2 = repo.Get().FirstOrDefault(c => comparer.Equals(subject1, c));
            Assert.Null(result2);

        }
    }
}

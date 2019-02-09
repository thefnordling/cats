using System;
using Xunit;

namespace Services.Tests
{
    public class LocalTimestampFactory
    {
        [Fact]
        public void LocalTest()
        {
            var factory = new Services.LocalTimestampFactory();
            var init = DateTime.SpecifyKind(DateTime.Today, DateTimeKind.Local);
            var local = new DateTimeOffset(init, TimeZoneInfo.Local.GetUtcOffset(init));
            
            Assert.Equal(local, factory.GetTimestamp(init));
        }

        [Fact]
        public void UtcTest()
        {
            var factory = new Services.LocalTimestampFactory();
            var init = DateTime.SpecifyKind(DateTime.Today, DateTimeKind.Utc);
            var utc = TimeZoneInfo.ConvertTimeToUtc(init);

            Assert.Equal(utc, factory.GetTimestamp(init));
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public class LocalTimestampFactory : ITimestampFactory
    {
        public DateTimeOffset GetTimestamp(DateTime time)
        {
            switch (time.Kind)
            {
                case DateTimeKind.Utc:
                    return TimeZoneInfo.ConvertTimeFromUtc(time, TimeZoneInfo.Local);
                default:
                    return new DateTimeOffset(time, TimeZoneInfo.Local.GetUtcOffset(time));
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface ITimestampFactory
    {
        DateTimeOffset GetTimestamp(DateTime time);
    }
}

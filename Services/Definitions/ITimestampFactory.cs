using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    interface ITimestampFactory
    {
        DateTimeOffset GetTimestamp(DateTime time);
    }
}

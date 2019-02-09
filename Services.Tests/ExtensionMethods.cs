using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using Services;
using Xunit;

namespace Services.Tests
{
    public class ExtensionMethods
    {
        [Fact]
        public void AddOrOverwrite()
        {
            var d = new ConcurrentDictionary<string, int>(StringComparer.OrdinalIgnoreCase);
            var p1 = d.AddOrOverwrite("potato", 9);
            var p2 = d.AddOrOverwrite("pOtato", 45);
            var p3 = d.AddOrOverwrite("orange", 4);
            Assert.Equal(9, p1);
            Assert.Equal(45, p2);
            Assert.Equal(45, d["Potato"]);
            Assert.Equal(4, d["orange"]);
            Assert.NotEqual(9, d["potato"]);
        }
    }
}

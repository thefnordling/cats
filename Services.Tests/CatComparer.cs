using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Tests
{
    public class CatComparer : IEqualityComparer<Cat>
    {
        public bool Equals(Cat x, Cat y)
        {
            return string.Equals(x.Id, y.Id, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(x.Name, y.Name, StringComparison.OrdinalIgnoreCase) &&
                x.Birth == y.Birth &&
                x.Hungry == y.Hungry &&
                x.Mood == y.Mood;
        }

        public int GetHashCode(Cat obj)
        {
            return obj.Id?.ToLower()?.GetHashCode() ?? 0;
        }
    }
}

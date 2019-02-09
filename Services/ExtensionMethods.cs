using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public static class ExtensionMethods
    {
        public static V AddOrOverwrite<K, V>(this ConcurrentDictionary<K, V> d, K key, V value)
        {
            return d.AddOrUpdate(key, value, (k, v) => value);
        }
    }
}

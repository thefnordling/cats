using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface IRepository<T>
    {
        T Insert(T item);
        T Update(T item);
        T Delete(T item);
        IEnumerable<T> Get();
    }
}

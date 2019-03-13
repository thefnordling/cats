using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Tests
{
    public class MockedCatRepository : IRepository<Cat>
    {
        public Cat Delete(Cat item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Cat> Get()
        {
            return new List<Cat>();
        }

        public Cat Insert(Cat item)
        {
            throw new NotImplementedException();
        }

        public Cat Update(Cat item)
        {
            throw new NotImplementedException();
        }
    }
}

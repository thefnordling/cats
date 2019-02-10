using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ui
{
    public interface ICatClient
    {
        Task UpdateCat(Cat c);
        Task DeleteCat(Cat c);
    }
}

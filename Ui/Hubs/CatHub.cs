using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ui
{
    [Authorize]
    public class CatHub : Hub<ICatClient>
    {
        public async Task CatUpdated(Cat c)
        {
            await Clients.All.UpdateCat(c);
        }
        public async Task CatDeleted(Cat c)
        {
            await Clients.All.DeleteCat(c);
        }
    }
}

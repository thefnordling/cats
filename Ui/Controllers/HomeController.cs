using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using NSwag.Annotations;

namespace Ui.Controllers
{
    [SwaggerIgnore]
    public class HomeController : Controller
    {
        [Route("~/")]
        [Route("~/Home")]
        [Route("~/Home/Index")]
        public IActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        [Route("~/Home/Login")]
        public async Task<IActionResult> Login(Login l)
        {
            ViewBag.ReturnUrl = l?.ReturnUrl;
            if (string.IsNullOrEmpty(l?.User?.Id) || string.IsNullOrEmpty(l?.User?.Password))
            {
                return View();
            }
            else
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, l.User.Id)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(60),
                    IsPersistent = true,
                    IssuedUtc = DateTimeOffset.UtcNow,
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                if (!string.IsNullOrEmpty(l?.ReturnUrl))
                {
                    return Redirect(l.ReturnUrl);
                }
                else
                {
                    return RedirectToAction("Index");
                }
            }
        }
        [Route("~/Home/Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index");
        }
    }
}

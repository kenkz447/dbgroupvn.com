using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;

namespace Omi.Base.Middwares
{
    public class LocalizationInputMiddleware
    {
        private readonly RequestDelegate _next;

        public LocalizationInputMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if(context.Request.Form.ContainsKey("language"))
            {
                var inputLanguage = new StringValues();
                context.Request.Form.TryGetValue("language", out inputLanguage);
                var targetCulture = CultureInfo.GetCultureInfo(inputLanguage);
                Thread.CurrentThread.CurrentCulture = targetCulture;
            }

            await _next(context);
        }
    }
}
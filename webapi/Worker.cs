using System.Security.Claims;
using webapi.Data.Models;

namespace webapi {
    public static class Worker {
        public static string ExtractUserId(ClaimsPrincipal pUser) {
            return pUser.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}

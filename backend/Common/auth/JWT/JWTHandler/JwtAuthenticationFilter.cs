using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Controllers;

public class JwtAuthenticationFilter : AuthorizeAttribute
{
    public override void OnAuthorization(HttpActionContext actionContext)
    {
        if (AuthorizeRequest(actionContext))
        {
            return;
        }

        HandleUnauthorizedRequest(actionContext);
    }

    protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
    {
        actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
    }

    private bool AuthorizeRequest(HttpActionContext actionContext)
    {
        try
        {
            var headers = actionContext.Request.Headers;
            if (!headers.Contains("Authorization"))
            {
                return false;
            }

            var tokenString = headers.GetValues("Authorization").FirstOrDefault()?.Replace("Bearer ", "");
            if (string.IsNullOrEmpty(tokenString))
            {
                return false;
            }

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(tokenString);
            var principal = new ClaimsPrincipal(new ClaimsIdentity(token.Claims, "jwt"));

            Thread.CurrentPrincipal = principal;

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}

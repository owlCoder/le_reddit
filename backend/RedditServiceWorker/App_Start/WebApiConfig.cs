using System.Web.Http;
using System.Web.Http.Cors;

namespace RedditServiceWorker
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable CORS globally
            var cors = new EnableCorsAttribute("http://localhost:5173", "*", "*");
            config.EnableCors(cors);

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "ExtendedApi",
                routeTemplate: "api/{controller}/{email}"
            );

            config.Routes.MapHttpRoute(
                name: "votesapi",
                routeTemplate: "api/{controller}/upvote/{postId}/{email}"
            );
        }
    }
}

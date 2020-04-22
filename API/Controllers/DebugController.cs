using System.Collections.Generic;
using System.Linq;
using API.Models.Debug;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;

namespace API.Controllers
{
	[ApiController]
	[Route("api/debug")]
	public class DebugController : ControllerBase
	{
		private readonly EndpointDataSource _endpointDataSource;

		public DebugController(EndpointDataSource endpointDataSource)
		{
			_endpointDataSource = endpointDataSource;
		}

		[HttpGet]
		[Route("error")]
		public IActionResult GetError()
		{
			return NotFound("Some error message");
		}

		[HttpGet]
		[Route("endpoints")]
		public IActionResult GetEndpointList()
		{
			var endpoints = _endpointDataSource.Endpoints.ToList();

			var list = new List<DebugRouteEndpoint>();
			foreach (var endpoint in endpoints)
			{
				var routeEndpoint = endpoint as RouteEndpoint;
				if (routeEndpoint == null)
				{
					continue;
				}

				var debugRouteEndpoint = new DebugRouteEndpoint
				{
					Order = routeEndpoint?.Order,
					DisplayName = endpoint.DisplayName,
					Pattern = routeEndpoint?.RoutePattern.RawText,
					Metadata = GetMetadata(routeEndpoint),
				};

				list.Add(debugRouteEndpoint);
			}

			return Ok(list);
		}

		private DebugMetadata GetMetadata(RouteEndpoint endpoint)
		{
			var debugMetadata = new DebugMetadata();

			foreach (var metadata in endpoint.Metadata)
			{
				switch (metadata)
				{
					case HttpMethodAttribute httpAttribute:
						debugMetadata.Http = string.Join(", ", httpAttribute.HttpMethods);
						break;

					case RouteAttribute routeAttribute:
						debugMetadata.RouteTemplates.Add(routeAttribute.Template);
						break;
				}
			}

			return debugMetadata;
		}
	}
}
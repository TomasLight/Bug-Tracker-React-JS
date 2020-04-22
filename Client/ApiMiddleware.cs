using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Client
{
	public class ApiMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly IHttpClientFactory _clientFactory;

		public ApiMiddleware(RequestDelegate next, IHttpClientFactory clientFactory)
		{
			_next = next;
			_clientFactory = clientFactory;
		}

		// todo: find a normal behaviour for this case and replace this crutch
		public async Task Invoke(HttpContext context)
		{
			if (context.Request.Path.StartsWithSegments("/api"))
			{
				var request = new HttpRequestMessage();
				
				var baseUrl = $"http://localhost:5000";
				var url = $"{context.Request.Path}";
				request.RequestUri = new Uri($"{baseUrl}{url}");
				
				request.Method = new HttpMethod(context.Request.Method);

				foreach (var header in context.Request.Headers)
				{
					request.Headers.Add(header.Key, header.Value as IEnumerable<string>);
				}

				var client = _clientFactory.CreateClient();

				var response = await client.SendAsync(request);
				if (response.IsSuccessStatusCode)
				{
					var responseJson = await response.Content.ReadAsStringAsync();
					await context.Response.WriteAsync(responseJson);
				}
			}
		}
	}
}
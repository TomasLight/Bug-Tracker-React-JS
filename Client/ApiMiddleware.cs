using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

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

		public async Task Invoke(HttpContext context)
		{
			if (context.Request.Path.StartsWithSegments("/api"))
			{
				var response = await SendAsync(context);
				var responseJson = await response.Content.ReadAsStringAsync();
				context.Response.StatusCode = (int) response.StatusCode;
				context.Response.ContentType = response.Content.Headers.ContentType.ToString();
				await context.Response.WriteAsync(responseJson);
			}
		}

		private async Task<HttpResponseMessage> SendAsync(HttpContext context)
		{
			var client = _clientFactory.CreateClient();
			client.BaseAddress = new Uri("http://localhost:5000");

			var contentType = context.Request.Headers.ContainsKey("ContentType")
				? context.Request.Headers["ContentType"].ToString()
				: "application/json";
			
			var mediaType = new MediaTypeWithQualityHeaderValue(contentType);

			client.DefaultRequestHeaders.Accept.Add(mediaType);

			var relativeUrl = context.Request.Path;
			var method = new HttpMethod(context.Request.Method);
			var request = new HttpRequestMessage(method, relativeUrl)
			{
				Content = new StreamContent(context.Request.Body)
			};
			request.Content.Headers.ContentType = mediaType;

			return await client.SendAsync(request);
		}
	}
}
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
//
// namespace API.Security
// {
// 	public class JwtBearerConfigurator
// 	{
// 		public JwtBearerOptions CreateOptions(JwtBearerOptions options)
// 		{
// 			options.TokenValidationParameters = new TokenValidationParameters
// 			{
// 				ValidateIssuer = true,
// 				ValidIssuer = AuthOptions.Issuer,
//
// 				ValidateAudience = true,
// 				ValidAudience = AuthOptions.Audience,
//
// 				ValidateLifetime = true,
//
// 				IssuerSigningKey = AuthOptions.GenerateSymmetricSecurityKey(),
// 				ValidateIssuerSigningKey = true,
// 			};
//
// 			return options;
// 		}
// 	}
// }
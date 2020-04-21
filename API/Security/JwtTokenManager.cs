// using System.Collections.Generic;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
//
// namespace API.Security
// {
// 	public class JwtTokenManager
// 	{
// 		private readonly JwtTokenFactory _jwtTokenFactory;
//
// 		public JwtTokenManager(JwtTokenFactory jwtTokenFactory)
// 		{
// 			_jwtTokenFactory = jwtTokenFactory;
// 		}
//
// 		public string EncodeJwt(IEnumerable<Claim> claims)
// 		{
// 			return EncodeJwt(claims, new AuthOptions());
// 		}
//
// 		public string EncodeJwt(IEnumerable<Claim> claims, AuthOptions options)
// 		{
// 			var token = _jwtTokenFactory.Create(claims, options);
// 			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);
// 			return encodedJwt;
// 		}
//
// 		public IEnumerable<Claim> GetClaimsFromEncodedJwtToken(string encodedJwtToken)
// 		{
// 			var jwtToken = DecodeJwt(encodedJwtToken);
// 			return jwtToken.Claims;
// 		}
//
// 		public JwtSecurityToken DecodeJwt(string encodedJwtToken)
// 		{
// 			var handler = new JwtSecurityTokenHandler();
// 			var jwtToken = handler.ReadJwtToken(encodedJwtToken);
//
// 			return jwtToken;
// 		}
// 	}
// }
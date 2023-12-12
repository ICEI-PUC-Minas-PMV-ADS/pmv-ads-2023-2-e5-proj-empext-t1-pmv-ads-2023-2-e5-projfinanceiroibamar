using System.Security.Claims;

namespace api_financeiro_ibamar.Services
{
    public class AuthenticatedUser 
    {
		private readonly IHttpContextAccessor _accessor;

		public AuthenticatedUser(IHttpContextAccessor accessor)
		{
			_accessor = accessor;
		}

		public string Email => _accessor.HttpContext.User.Identity.Name;

		public string Name => GetClaimsIdentity().FirstOrDefault(a => a.Type == ClaimTypes.NameIdentifier)?.Value;

		public string Sid => GetClaimsIdentity().FirstOrDefault(a => a.Type == ClaimTypes.Sid)?.Value;

		public string Role => GetClaimsIdentity().FirstOrDefault(a => a.Type == ClaimTypes.Role)?.Value;

		
		public IEnumerable<Claim> GetClaimsIdentity()
		{
			return _accessor.HttpContext.User.Claims;
		}

		public string GetEmail()
		{
			return this.Email;
		}

		public string GetName()
		{
			return this.Name;
		}


		public string GetSid()
		{
			return this.Sid;
		}


		public string GetRole()
		{
			return this.Role;
		}


	}
}

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PatientTransfer.Server.Data;
using PatientTransfer.Server.Domain.Accounts;
using PatientTransfer.Server.Domain.Clinic;

namespace PatientTransfer.Server.Services.Auth;

public class AuthService(UserService userService)
{
    public static readonly string Secret = "2747C3342D9F4CCCB816E76AB26E7E2E";

    public static byte[] SecretBytes => Encoding.UTF8.GetBytes(Secret);

    public AuthenticationData? AuthenticateAsync(AuthByPasswordData data)
    {
        var userAccount = userService.FindByUsernameAndPasswordAsync(data.Username, data.Password);

        if (userAccount is null)
            return null;

        var doctor = userAccount.Hospital.FindDoctor(userAccount.Person);

        var isRegulator =
            doctor is not null && ReferenceEquals(userAccount.Hospital.Regulator, doctor);

        var accessToken = GenerateAccessToken(userAccount, doctor, isRegulator);
        var personId = userAccount.Person.Id;

        return new AuthenticationData(personId, accessToken);
    }

    private static string GenerateAccessToken(
        UserAccount userAccount,
        Doctor? doctor,
        bool isRegulator = false
    )
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, userAccount.Username),
            new(ClaimTypes.NameIdentifier, userAccount.Person.Id),
            new("hospitalId", userAccount.Hospital.Id),
        };

        if (doctor is not null)
        {
            claims.Add(new Claim("doctorId", doctor.Id));
            claims.Add(new Claim(ClaimTypes.Role, UserRole.Doctor));
        }

        if (isRegulator)
        {
            claims.Add(new Claim(ClaimTypes.Role, UserRole.Regulator));
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = SecretBytes;

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            ),
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return tokenString;
    }
}

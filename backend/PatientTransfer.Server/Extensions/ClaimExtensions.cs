using System.Globalization;
using System.Security.Claims;

namespace PatientTransfer.Server.Extensions;

public static class ClaimExtensions
{
    public static T? ParseAs<T>(this Claim? claim)
        where T : IParsable<T>
    {
        return claim is not { Value: var claimValue }
            ? default
            : T.Parse(claimValue, CultureInfo.CurrentCulture);
    }

    public static T ParseAsRequired<T>(this Claim? claim)
        where T : IParsable<T>
    {
        if (
            claim is not { Value: var claimValue }
            || !T.TryParse(claimValue, CultureInfo.CurrentCulture, out var parsedValue)
        )
        {
            throw new InvalidOperationException("Claim value is not valid.");
        }

        return parsedValue;
    }
}

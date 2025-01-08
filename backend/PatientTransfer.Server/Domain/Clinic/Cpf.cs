using System.Diagnostics.CodeAnalysis;

namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct Cpf(string Value) : IParsable<Cpf>
{
    public static Cpf Random()
    {
        var random = new Random();
        var digits = new int[9];

        for (var i = 0; i < 9; i++)
        {
            digits[i] = random.Next(0, 10);
        }

        var sum = 0;

        for (var i = 0; i < 9; i++)
        {
            sum += digits[i] * (10 - i);
        }

        var firstVerificationDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);

        digits = digits.Append(firstVerificationDigit).ToArray();
        sum = 0;

        for (var i = 0; i < 10; i++)
        {
            sum += digits[i] * (11 - i);
        }

        var secondVerificationDigit = (sum % 11 < 2) ? 0 : 11 - (sum % 11);

        digits = digits.Append(secondVerificationDigit).ToArray();

        return new Cpf(string.Join("", digits));
    }

    public static implicit operator string(Cpf cpf) => cpf.Value;

    public static Cpf Parse(string s, IFormatProvider? provider) => new(s);

    public static bool TryParse(
        [NotNullWhen(true)] string? s,
        IFormatProvider? provider,
        out Cpf result
    )
    {
        if (s is null)
        {
            result = default;

            return false;
        }

        result = new Cpf(s);

        return true;
    }
}

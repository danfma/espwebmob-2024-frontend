using System.Diagnostics.CodeAnalysis;

namespace PatientTransfer.Server.Domain.Clinic;

public interface IEntityId<out TSelf>
    where TSelf : IEntityId<TSelf>
{
    static abstract TSelf None { get; }

    static abstract TSelf New();
}

public interface IEntityId<TSelf, TValue> : IEntityId<TSelf>, IParsable<TSelf>
    where TSelf : IEntityId<TSelf, TValue>
    where TValue : IParsable<TValue>
{
    TValue Value { get; }

    static abstract TSelf Create(TValue value);

    static TSelf IParsable<TSelf>.Parse(string s, IFormatProvider? provider)
    {
        return TSelf.Create(TValue.Parse(s, provider));
    }

    static bool IParsable<TSelf>.TryParse(
        [NotNullWhen(true)] string? s,
        IFormatProvider? provider,
        out TSelf result
    )
    {
        if (!TValue.TryParse(s, provider, out var value))
        {
            result = TSelf.None;

            return false;
        }

        result = TSelf.Create(value);

        return true;
    }
}

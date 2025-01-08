namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct Crm(string Value)
{
    private static readonly char[] Letters =
    [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];

    public static Crm Random()
    {
        var choices = System.Random.Shared.GetItems(Letters, 5);

        return new Crm(string.Join("", choices));
    }
}

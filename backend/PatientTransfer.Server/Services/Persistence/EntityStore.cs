using NetTopologySuite.Geometries;
using NetTopologySuite.IO.Converters;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PatientTransfer.Server.Domain.Accounts;
using PatientTransfer.Server.Domain.Clinic;

namespace PatientTransfer.Server.Services.Persistence;

public sealed class EntityStore
{
    private static readonly JsonSerializerSettings JsonSerializerSettings = new()
    {
        ContractResolver = new CamelCasePropertyNamesContractResolver(),
        Converters = { new GeometryConverter() },
        PreserveReferencesHandling = PreserveReferencesHandling.Objects,
        ReferenceLoopHandling = ReferenceLoopHandling.Error,
    };

    public HashSet<Specialty> Specialties { get; set; } = [];
    public HashSet<Person> People { get; set; } = [];
    public HashSet<Doctor> Doctors { get; set; } = [];
    public HashSet<Hospital> Hospitals { get; set; } = [];
    public HashSet<UserAccount> UserAccounts { get; set; } = [];

    public async ValueTask Load(string fileName, CancellationToken cancellationToken)
    {
        if (!File.Exists(fileName))
            return;

        var json = await File.ReadAllTextAsync(fileName, cancellationToken);

        JsonConvert.PopulateObject(json, this, JsonSerializerSettings);
    }

    public async ValueTask Persist(string fileName, CancellationToken cancellationToken)
    {
        var json = JsonConvert.SerializeObject(this, JsonSerializerSettings);

        await using var fileStream = File.CreateText(fileName);
        await fileStream.WriteAsync(json).WaitAsync(cancellationToken);
        await fileStream.FlushAsync(cancellationToken);
    }

    public static EntityStore CreateInMemory()
    {
        var specialties = new[]
        {
            CreateSpecialty("Cardiology"),
            CreateSpecialty("Neurology"),
            CreateSpecialty("Pediatrics"),
            CreateSpecialty("General Medicine"),
            CreateSpecialty("Surgery"),
        };

        var people = new[]
        {
            CreatePerson("Ana"),
            CreatePerson("Bernardo"),
            CreatePerson("Carlos"),
            CreatePerson("Daniel"),
            CreatePerson("Einstein"),
            CreatePerson("Fábio"),
        };

        var doctors = new[]
        {
            CreateDoctor(people[0], [specialties[0], specialties[4]]),
            CreateDoctor(people[1], [specialties[1]]),
            CreateDoctor(people[2], [specialties[2]]),
            CreateDoctor(people[3], [specialties[3]]),
            CreateDoctor(people[4], [.. specialties]),
            CreateDoctor(people[5], [specialties[3]]),
        };

        var hospitalA = CreateHospital("A", new Point(10, 10), doctors[..4], doctors[0]);
        var hospitalAUsers = GenerateUserAccounts(hospitalA);

        hospitalA.AddRooms(5);

        var hospitalB = CreateHospital("B", new Point(20, 20), doctors[3..], doctors[4]);
        var hospitalBUsers = GenerateUserAccounts(hospitalB);

        hospitalB.AddRooms(3);

        return new EntityStore
        {
            Specialties = [.. specialties],
            People = [.. people],
            Doctors = [.. doctors],
            Hospitals = [hospitalA, hospitalB],
            UserAccounts = [.. hospitalAUsers, .. hospitalBUsers],
        };
    }

    private static Specialty CreateSpecialty(string name) => new(name);

    private static Person CreatePerson(string name)
    {
        return new Person(name, Cpf.Random()) { Id = PersonId.New() };
    }

    private static Doctor CreateDoctor(Person person, Specialty[] specialties)
    {
        return new Doctor(person, Crm.Random(), specialties) { Id = DoctorId.New() };
    }

    private static Hospital CreateHospital(
        string name,
        Point location,
        Doctor[] doctors,
        Doctor regulator
    )
    {
        return new Hospital(name, location, doctors, regulator) { Id = HospitalId.New() };
    }

    private static IEnumerable<UserAccount> GenerateUserAccounts(Hospital hospital)
    {
        foreach (var doctor in hospital.Doctors)
        {
            // TODO do not use doctor's name as the username
            var user = new UserAccount(
                hospital,
                doctor.Person,
                doctor.Person.Name.ToLower(),
                "123456"
            );

            yield return user;
        }
    }
}

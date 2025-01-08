using NetTopologySuite.Geometries;

namespace PatientTransfer.Server.Domain.Clinic;

public class Hospital : Entity<HospitalId>
{
    public Hospital(string name, Point location, IEnumerable<Doctor> doctors, Doctor regulator)
    {
        Name = name;
        Location = location;
        Doctors = [.. doctors];
        Regulator = regulator;

        if (!Doctors.Contains(Regulator))
        {
            throw new ArgumentException(
                "The regulator must be a doctor of the hospital",
                nameof(regulator)
            );
        }
    }

    public string Name { get; }

    public Point Location { get; }

    public Doctor Regulator { get; private set; }

    public HashSet<Doctor> Doctors { get; init; } = new();

    public HashSet<Room> Rooms { get; init; } = new();

    public void AddRooms(int count)
    {
        var prefix = "R";

        for (var i = 0; i < count; i++)
        {
            Rooms.Add(new Room { Id = RoomId.Create($"{prefix}{i + 1}") });
        }
    }

    public Doctor? FindDoctor(Person person)
    {
        return Doctors.FirstOrDefault(doctor => ReferenceEquals(doctor.Person, person));
    }
}

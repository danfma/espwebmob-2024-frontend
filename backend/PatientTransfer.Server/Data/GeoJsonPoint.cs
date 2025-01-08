namespace PatientTransfer.Server.Data;

public readonly record struct GeoJsonPoint(double[] Coordinates)
{
    public string Type => "Point";
}

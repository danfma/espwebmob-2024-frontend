using System.Text.Json.Serialization;

namespace PatientTransfer.Server.Data;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "kind")]
[JsonDerivedType(typeof(Guest), nameof(Guest))]
[JsonDerivedType(typeof(AuthenticatedUser), "User")]
public abstract record User;
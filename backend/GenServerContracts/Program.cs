using GenServerContracts;
using TypeGen.Core;
using TypeGen.Core.Generator;

var options = new GeneratorOptions
{
    BaseOutputDirectory = "../../frontend/patient-transfer-app/src/api/contracts/",
    SingleQuotes = false,
    UseTabCharacter = false,
    CsNullableTranslation = StrictNullTypeUnionFlags.Null,
    TabLength = 2,
    CreateIndexFile = true,
    ExportTypesAsInterfacesByDefault = true,
};

var generator = new Generator(options);

generator.Generate(new DataSpec());

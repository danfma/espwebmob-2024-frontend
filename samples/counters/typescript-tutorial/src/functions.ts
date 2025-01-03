// declaração de varíaveis: let, const e var
// escopo
// função e relacionamento com escopo


type Operation = (a: number, b: number) => number

const sum: Operation = (a, b) => a + b;
const subtract: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;

function calculate_naive(op: string, a: number, b: number): number {
    switch (op) {
        case "some":
            return sum(a, b);
        case "subtraia":
            return subtract(a, b);
        case "multiplique":
            return multiply(a, b);
        case "divida":
            return divide(a, b);
        default:
            throw new Error("Operação não existe");
    }
}

function calculateV1(op: "some", a: number, b: number): number;
function calculateV1(op: "subtraia", a: number, b: number): number;
function calculateV1(op: "multiplique", a: number, b: number): number;
function calculateV1(op: "divida", a: number, b: number): number;
function calculateV1(op: string, a: number, b: number): number {
    switch (op) {
        case "some":
            return sum(a, b);
        case "subtraia":
            return subtract(a, b);
        case "multiplique":
            return multiply(a, b);
        case "divida":
            return divide(a, b);
        default:
            throw new Error("Operação não existe");
    }
}

enum Operator {
    Soma,
    Subtraia,
    Multiplique,
    Divida
}

function calculateV2(op: Operator, a: number, b: number): number {
    switch (op) {
        case Operator.Soma:
            return sum(a, b);
        case Operator.Subtraia:
            return subtract(a, b);
        case Operator.Multiplique:
            return multiply(a, b);
        case Operator.Divida:
            return divide(a, b);
    }
}

const operationMap = {
    [Operator.Soma]: sum,
    [Operator.Subtraia]: subtract,
    [Operator.Multiplique]: multiply,
    [Operator.Divida]: divide
}

function calculateV3(op: Operator, a: number, b: number): number {
    let operation: Operation;

    switch (op) {
        case Operator.Soma:
            operation = sum;
            break;

        case Operator.Subtraia:
            operation = subtract;
            break;

        case Operator.Multiplique:
            operation = multiply;
            break;

        case Operator.Divida:
            operation = divide;
            break;
    }

    return operation(a, b);
}

const operation2Map = {
    "some": sum,
    "subtraia": subtract,
    "multiplique": multiply,
    "divida": divide
}

type OpMap = typeof operation2Map;
type ValidOperators = keyof OpMap;

function calculateV4(op: ValidOperators, a: number, b: number): number {
    const operation = operation2Map[op];

    return operation(a, b);
}

function assertIsOp(value: string): asserts value is ValidOperators {
    if (!(value in operation2Map)) {
        throw new Error('Operator invalido')
    }
}

function isOp(value: string): value is ValidOperators {
    return value in operation2Map;
}

function readOp(): ValidOperators {
    const x: string = "some";

    assertIsOp(x);

    return x;
}

// como funcionar?

// A0
const a = 10;

// A1
const op = readOp();

// A2
const b = 20;

// A2: =calculate(A0, A1)
const result = calculateV4("some", a, b);

console.log(`${a} + ${b} = ${result}`)

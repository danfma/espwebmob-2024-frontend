
const person = {
    name: "Fulanito",
    age: 18,
}

interface Named {
    readonly name: string;
    readonly age: number;
}

type PersonNamed = {
    readonly name: string
} & {
    readonly age: number
}

class Person implements Named {
    constructor(readonly name: string, readonly age: number) { }
}


function printName(named: PersonNamed) {
    console.log(named.name)
}

const p1 = new Person("Daniel", 41)

printName(p1)

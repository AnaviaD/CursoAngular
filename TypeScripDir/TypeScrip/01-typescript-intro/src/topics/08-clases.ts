export class Person{
    // public name?: string;
    // public address?: string;

    constructor(
        public name: string,
        public address: string = 'New York'
        ){}
}

// export class Hero extends Person{
//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ){
//         super(realName, 'New York')
//     }
// }


export class Hero{

    // public person: Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ){
        this.person = new Person(realName);
    }
}

const person = new Person('Tony Stark', 'New York')
const ironman = new Hero('IronMan', 45, 'Tony', person);

console.log(ironman)
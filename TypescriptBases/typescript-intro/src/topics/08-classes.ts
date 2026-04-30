

export class Person {
    // public name : string;
    // public address: string;
    constructor(
        public name:    string = '',
        public address: string = ''
    ){}
}

// export class Hero extends Person {
//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ){
//         super(realName, 'New York');
//     }
// }

export class Hero {
    
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ){
        // this.person = new Person(realName)
    }
}

const tony = new Person('Tony Stark', 'New York')

// const ironman = new Person('Iron man', 'Costa Rica');
const ironman = new Hero('Iron man', 45, 'Tony', tony);

console.log(ironman)
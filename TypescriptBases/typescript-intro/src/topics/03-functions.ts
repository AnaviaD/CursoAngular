

function addNumbers(a:number, b:number){
    return a + b
}

const addNumbersArrow = (a: number, b:number):string => {
    return `${a + b}`;
}

function multiply(firstNumber: number, secondNumber?: number, base: number = 2){
    return firstNumber * base;
}

const result = addNumbers(1, 2);
const result2 = addNumbersArrow(1, 2);
const result3 = multiply(5);

// console.log({result})
// console.log({result2})
// console.log({result3})

interface Character {
    name: string;
    hp: number;
    showHp: ()=> void;
}

const healCharacter = (character : Character, amount: number) => {
    character.hp += amount;
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`);
    }
}

healCharacter(strider, 10)

strider.showHp()



export {};
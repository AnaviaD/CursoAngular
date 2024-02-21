

function addNumbers(a: number, b:number)
{
    return a + b;
}

const addNumbersArrow = (a: number, b: number):string =>{
    return `${a + b}`;
}

function multiply(firstNumb: number, secondNumber?: number, base: number = 2)
{
    return firstNumb*base;    
}

// const result: number = addNumbers(1,2);
// const result2: string = addNumbersArrow(1,2);
// const multiplyResult: number = multiply(1);
// console.log({result, result2, multiplyResult});

interface Character{
    name: string;
    hp: number;
    showHP: () => void;
}

const healCharacter = (character: Character, amount:   number) => {
    character.hp += amount;
}

const strider:Character = {
    name: 'Strider',
    hp: 50,
    showHP(){
        console.log(`Puntos de vida ${this.hp}`);
    }
}

healCharacter(strider, 10);
healCharacter(strider, 10);

strider.showHP();



export  {};
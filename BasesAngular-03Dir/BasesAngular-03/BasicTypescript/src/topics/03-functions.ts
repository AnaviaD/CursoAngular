function addnumbers(a: number, b: number){
    return a + b;
}

const addNumbersArrow = (a: number, b: number):string => {
    return `${a + b}`;
}

function multiply(firstNum: number, secondNumb?: number, base: number = 2){
    return firstNum * base
}

interface Character{
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = (character:Character, amount: number) =>{
    character.hp += amount;
}

const strider: Character = {
    name: 'Strider',
    hp : 50,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`);
    },
}

healCharacter(strider, 10)

strider.showHp();

healCharacter(strider, 10)

strider.showHp();


export {};
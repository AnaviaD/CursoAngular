

const name:string = 'Strider';
//Podemos declarar una variable de varios tipos y de un valor especifico
let hpPoints: number|string|true = 95;
const isAlive:boolean = true;

hpPoints = true;

console.log({
    name, hpPoints, isAlive
})


export {};
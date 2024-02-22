

export function whatsMyType(argument:any){
    return argument
}

const amIString = whatsMyType('Hola Mundo');
const amINumber = whatsMyType(100);
const amIArray = whatsMyType([1,2,3,4,5]);

console.log(amIString.split2(''));
console.log(amINumber.split2(''));
console.log(amIArray.split2(''));
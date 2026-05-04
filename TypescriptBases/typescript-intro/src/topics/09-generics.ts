
//Cuando no se especifica el tipo de una funcion podemos utlizar genericos
export function whatsMyType<T>(argument: T): T{
    return argument;
}

//Tiene prioridad sobre el argumento <string>
const amIString = whatsMyType<string>('Hola Mundo');
const amINumber = whatsMyType<number>(100);
const amIArray = whatsMyType<number[]>([1,2,3,4,5]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));
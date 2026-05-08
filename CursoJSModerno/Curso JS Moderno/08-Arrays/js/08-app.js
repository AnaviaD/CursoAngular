const producto = {
    nombre: 'Monitor de 32 pulgadas',
    precio: 400,
    disponible: true
}

const {nombre} = producto

console.log(nombre)

const numeros = [10,20,30,40,50];
console.log(numeros)

const [primero] = numeros
console.log(primero)

//Para controlar el orden lo hacemos con las comas ,
const [, , tercero] = numeros

console.log(tercero);
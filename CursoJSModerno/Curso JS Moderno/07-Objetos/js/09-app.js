"use strict"

const producto = {
    nombre: "Monitor de 20 Pulgadas",
    precio: 300,
    disponible : true
}

const medidas = {
    peso: '1Kg',
    medida: '1m'
}

console.log(producto)
console.log(medidas)

const resultado = Object.assign(producto, medidas);

console.log(resultado)
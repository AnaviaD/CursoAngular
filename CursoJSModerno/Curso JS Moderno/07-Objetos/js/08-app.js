"use strict"

const producto = {
    nombre: "Monitor de 20 Pulgadas",
    precio: 300,
    disponible : true
}

Object.freeze(producto)


// producto.imagen = "imagen.jpg"
// producto.disponible = true

console.log(producto)

console.log(Object.isFrozen(producto))

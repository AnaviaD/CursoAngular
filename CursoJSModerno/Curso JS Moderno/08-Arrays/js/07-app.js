const carrito = [];

const producto = {
    nombre: 'Monitor de 32 pulgadas',
    precio: 400
}

const producto01 = {
    nombre: 'Celular',
    precio: 800
}


const producto02 = {
    nombre: 'Teclado',
    precio: 50
}

carrito.push(producto)
carrito.push(producto01)
carrito.push(producto02)

console.table(carrito)

//Elimina ultimo elemento de un arreglo
carrito.pop()

console.table(carrito)

//Eliminamos desde el inicio
carrito.shift()

console.table(carrito)
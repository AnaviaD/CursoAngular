const carrito = [
    {nombre: 'Monitor 27 pulgadas', precio: 500},
    {nombre: 'Television', precio: 100},
    {nombre: 'Tablet', precio: 200},
    {nombre: 'Audifonos', precio: 300},
    {nombre: 'Teclado', precio: 400},
    {nombre: 'Celular', precio: 700},
]

const carrito1 = carrito.forEach(    function(producto) {
    return `${producto.nombre} - ${producto.precio}`
})

//La diferencia es que .map crea un nuevo arreglo
const carrito02 = carrito.map(    function(producto){
    return `${producto.nombre} - ${producto.precio}`
})

console.log(carrito1)
console.log(carrito02)
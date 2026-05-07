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

let resultado;

resultado = [... carrito, producto]

console.log(resultado)
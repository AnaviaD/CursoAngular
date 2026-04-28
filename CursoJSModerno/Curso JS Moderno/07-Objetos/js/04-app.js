const producto = {
    nombre: "Monitor de 20 Pulgadas",
    precio: 300,
    disponible : true
}

// Agregar nuevas propiedades al objeto
const nombre = producto.nombre;

console.log(producto)

const {nombre: n} = producto

console.log(n)
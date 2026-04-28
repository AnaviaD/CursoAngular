const producto = {
    nombre: "Monitor de 20 Pulgadas",
    precio: 300,
    disponible : true
}

// Agregar nuevas propiedades al objeto
producto.imagen = "imagen.ipg"

delete producto.disponible;

console.log(producto)
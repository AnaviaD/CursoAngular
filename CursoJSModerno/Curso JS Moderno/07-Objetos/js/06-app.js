const producto = {
    nombre: "Monitor de 20 Pulgadas",
    precio: 300,
    disponible : true,
    informacion:
    { 
        medidas:
        {
            peso: '1Kg',
            medidas: '1m'
        },
        fabricacion: {
            pais: 'China'
        }
    }
}

const {nombre, informacion: {fabricacion}} = producto;

console.log(nombre)
console.log(informacion)
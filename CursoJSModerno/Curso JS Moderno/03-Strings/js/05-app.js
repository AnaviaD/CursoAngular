const producto = 'Monitor 20 pulgadas ';

console.log(producto);
console.log(producto.replace('pulgadas', '"'));
console.log(producto.replace('Monitor', 'Monitor Curvo'));

//slice para cortar
console.log(producto.slice(0, 10))
console.log(producto.slice(8))


//Alternativa a Slice
console.log(producto.substring(0, 10));
console.log(producto.substring(2, 1));
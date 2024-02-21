
import { Producto, taxCalculation } from './06-function-destructuring';

const shoppingCart: Producto[] = [
    {
        desciption  :   'Nokia A1',
        price       :   150.0
    },
    {
        desciption  :   'iPad Air',
        price       :   250.0
    }
];

const [ total, tax ] = taxCalculation({
    products:shoppingCart,
    tax: 0.15
});


console.log('Total', total);
console.log('Tax', tax);

export{};
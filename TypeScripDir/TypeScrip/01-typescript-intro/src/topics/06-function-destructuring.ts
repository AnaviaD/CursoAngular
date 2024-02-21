export interface Producto{
    desciption  :string;
    price       :number;
}

const phone: Producto = {
    desciption  :   'Nokia A1',
    price       :   150.0
}

const tablet: Producto = {
    desciption  :   'iPad Air',
    price       :   250.0
}

interface TaxCalculationOptions{
    tax:number;
    products: Producto[];
}

export function taxCalculation(options: TaxCalculationOptions): number[]{
    let total = 0;

    options.products.forEach(({price}) =>{
        total   += price;
    });

    return [total, total * options.tax];
}


const shoppingCart  = [phone, tablet];
const tax = 0.15;

const [r1,r2] = taxCalculation({
    products: shoppingCart,
    tax
});

console.log('Total', r1);
console.log('Tax', r2);


export {

};
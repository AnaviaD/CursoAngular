interface Product{
    description: string;
    price: number;
}

const phone: Product = {
    description: "Nokia A1",
    price: 150
}

const tablet: Product = {
    description: 'Ipad Air',
    price: 250 
}

interface TaxCalculationOptions{
    tax: number;
    products: Product[];
}

function taxCalculation(options: TaxCalculationOptions): number[]{
    let total = 0;
    const { products, tax } = options;    
    
    products.forEach ( ({price}) => {
        total += price;
    });

    return [total, total* tax]
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

const [total, taxRes ] = taxCalculation({
    products: shoppingCart,
    tax: tax
});


console.log('Total  :', total)
console.log('tax    :', taxRes)



export{}
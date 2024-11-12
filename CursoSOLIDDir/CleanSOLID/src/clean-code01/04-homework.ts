(() => {


    // Resolver sin la triple condicional dentro del if
    // includes? arrays?
    function isRedFruit( fruit: string ): boolean {
        const redFruits = ['manzana', 'cereza', 'ciruela']

        return redFruits.includes(fruit);
    }

    // Simplificar esta función
    // switch? Object literal? validar posibles colores
    function getFruitsByColor( color: string ): string[] {

        switch (color) {
            case 'red':
                return ['manzana','fresa']; 
                break;

            case 'yellow':
                return ['piña','banana']; 
                break;

            case 'purple':
                return ['moras','uvas']; 
                break;
        
            default:
                throw Error('the color must be: red, yellow, purple');
                break;
        }        
    }

    // Simplificar esta función
    let isFirstStepWorking  = true;
    let isSecondStepWorking = true;
    let isThirdStepWorking  = true;
    let isFourthStepWorking = true;

    function workingSteps() {

        if( !isFirstStepWorking) return 'First is not working';
        if( !isSecondStepWorking) return 'Second is not working';
        if( !isThirdStepWorking) return 'Third is not working';
        if( !isFourthStepWorking) return 'Fourt is not working';
        return 'Working propertly';          
    }


    // isRedFruit
    console.log({ isRedFruit: isRedFruit('cereza'), fruit: 'cereza' }); // true
    console.log({ isRedFruit: isRedFruit('piña'), fruit: 'piña' }); // true

    //getFruitsByColor
    console.log({ redFruits: getFruitsByColor('red') }); // ['manzana', 'fresa']
    console.log({ yellowFruits: getFruitsByColor('yellow') }); // ['piña', 'banana']
    console.log({ purpleFruits: getFruitsByColor('purple') }); // ['moras', 'uvas']
    console.log({ pinkFruits: getFruitsByColor('pink') }); // Error: the color must be: red, yellow, purple

    // workingSteps
    console.log({ workingSteps: workingSteps() }); // Cambiar los valores de la línea 31 y esperar los resultados


})();





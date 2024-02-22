
export interface Passenger{
    name: string;
    children?: string[];
}

const passenger1:   Passenger = {
    name:   'Fernando'
}

const passenger2:   Passenger = {
    name:   'Melissa',
    children: ['Natalia', 'Elizabeth']
}

const printChildren = (passenger: Passenger) => {

    const hoManyChildren = passenger.children?.length || 0;

    console.log(passenger.name, hoManyChildren);
}

printChildren(passenger2);
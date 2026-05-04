
export interface Passanger {
    name: string;
    children?: string[];
}

const passenger01: Passanger = {
    name: 'Fernando',
}

const passenger02: Passanger = {
    name: 'Melissa',
    children: ['Natalia', 'Elizabeth']
}

const printChildren = (passenger: Passanger):number => {
    const howManyChildren = passenger.children?.length;
    // const howManyChildren = passenger.children!.length;

    console.log(passenger.name, howManyChildren);

    return howManyChildren;
}

printChildren(passenger02)
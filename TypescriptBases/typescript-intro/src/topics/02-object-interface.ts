const skills: string[]  = ['Bash', 'Counter', 'Healing'];

console.log(skills)

interface Character{
    name: string;
    hp: number;
    skills: string[];
    hometown?: string|undefined;
}

const strider:Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter'],  
};

strider.hometown = 'Riverdall';

console.table(strider);

export {};
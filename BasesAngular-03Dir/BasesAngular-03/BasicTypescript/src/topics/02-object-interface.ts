let skills:string[] = ['bash', 'Counter', 'Healing'];

interface Character{
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter'],
    hometown: ""
};

strider.hometown = "Rivenderll";

console.table(strider);


export{};

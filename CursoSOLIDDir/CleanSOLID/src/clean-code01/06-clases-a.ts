(() => {

    type Gender = 'M' | 'F';

    class Person{
        public name: string;
        public gender: Gender;
        public birthdate: Date;

        constructor(name: string, gender: Gender, birthdate: Date)
        {
            this.name = name;
            this.gender = gender;
            this.birthdate = birthdate;
        }
    }

    const newPerson = new Person('Fenando', 'M', new Date('2014-01-21'));

    console.log({newPerson});

})();
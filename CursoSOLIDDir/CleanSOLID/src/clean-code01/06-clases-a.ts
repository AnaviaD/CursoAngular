(() => {

    type Gender = 'M' | 'F';

    class Person{
        constructor(
            public name: string, 
            public gender: Gender, 
            public birthdate: Date
        ) {}
    }

    class User extends Person{

        public  lastAccess     : Date;

        constructor(
            public   email          : string, 
            public   role           : string, 
            name: string, 
            gender: Gender, 
            birthdate: Date
        ) {
            super(name, gender, birthdate  );
            this.lastAccess = new Date();
        }
        checkCredentials() {
            return true;
        }            

    }

    const newPerson = new Person('Fenando', 'M', new Date('2014-01-21'));

    console.log({newPerson});

})();




    // Long ver
    // class Person{
    //     public name: string;
    //     public gender: Gender;
    //     public birthdate: Date;

    //     constructor(name: string, gender: Gender, birthdate: Date)
    //     {
    //         this.name = name;
    //         this.gender = gender;
    //         this.birthdate = birthdate;
    //     }
    // }

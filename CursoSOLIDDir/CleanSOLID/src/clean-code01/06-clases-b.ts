(() => {

    type Gender = 'M' | 'F';


    interface PersonProps {
        name: string, 
        gender: Gender, 
        birthdate: Date
    }

    //  Primera clase re-fac
    class Person{
        public name         : string;
        public gender       : Gender;
        public birthdate    : Date;

        constructor({name, gender, birthdate} : PersonProps) {
            this.name = name;
            this.gender = gender;
            this.birthdate = birthdate;
        }
    }

    interface UserProps {
        name            : string;
        gender          : Gender;    
        birthdate       : Date;

        email           : string;
        role            : string;
    }

    // Segunda clase re-fac
    class User extends Person{

        public  email           : string;
        public  role            : string;
        public  lastAccess      : Date;

        constructor({ 
            name,
            gender,
            birthdate,
            email,
            role
        } : UserProps)
        {
            super({name, gender, birthdate});            
            this.email          = email;
            this.role           = role;
            this.lastAccess     = new Date();

        }

        checkCredentials() {
            return true;
        }            
    }

    // class UserSettings extends User{
    //     constructor(
    //         public workingDirectory : string,
    //         public lastOpenFolder   : string,
    //         email                   : string,
    //         role                    : string,
    //         name                    : string,
    //         gender                  : Gender,
    //         birthdate               : Date,

    //     ) 
    //     {
    //         super(email, role, name, gender, birthdate);
    //     }
    // }

    // const userSettings = new UserSettings(
    //     '/usr/home',
    //     '/home',
    //     'fedelobo@gmail.lolcow',
    //     'Admin',
    //     'Fernando',
    //     'M',
    //     new Date('1985-10-21')
    // );    

    // console.log({   userSettings    });
    // console.log({   areCredentiasAreTrue:userSettings.checkCredentials()    });
    
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

// const newPerson = new Person('Fenando', 'M', new Date('2014-01-21'));
// console.log({newPerson});
(() => {

    type Gender = 'M' | 'F';

    // Aplicar la composicion frente a la herencia 


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
        email           : string;
        role            : string;
    }

    // Segunda clase re-fac
    class User{

        public  email           : string;
        public  role            : string;
        public  lastAccess      : Date;

        constructor({ email, role } : UserProps)
        {            
            this.email          = email;
            this.role           = role;
            this.lastAccess     = new Date();
        }

        checkCredentials() {
            return true;
        }            
    }

    interface SettingsProps{
        workingDirectory        : string
        lastOpenFolder          : string        
    }

    class Settings{

        public workingDirectory        : string;
        public lastOpenFolder          : string;

        constructor({ workingDirectory, lastOpenFolder}: SettingsProps ) 
        {
            this.workingDirectory = workingDirectory;
            this.lastOpenFolder = lastOpenFolder;
        }
    }

    interface UserSettingsProps{
        workingDirectory        : string;
        lastOpenFolder          : string;
        email                   : string;
        role                    : string;
        name                    : string;
        gender                  : Gender;
        birthdate               : Date;
    }


    class UserSettings{

        public person   : Person;
        public user     : User;
        public settings : Settings;

        constructor({
            workingDirectory,
            lastOpenFolder,
            email,
            role,
            name,
            gender,
            birthdate,
        } : UserSettingsProps)
        {
            this.person = new Person({ name, gender, birthdate });
            this.user = new User({ email, role });
            this.settings = new Settings({ workingDirectory, lastOpenFolder });
        }
    }

    //Podemos observar como ahora el helper detecta el error pero el codigo sige corriendo

    const userSettings = new UserSettings({
        workingDirectory: '/usr/home',
        lastOpenFolder: '/home',
        email: 'fedelobo@gmail.lolcow',
        role: 'Admin',
        name: 'Fernando02',
        gender: 'M',
        birthdate:  new Date('1985-10-21')
    });    

    console.log({   userSettings    });
    console.log({   areCredentiasAreTrue:userSettings.user.checkCredentials()    });
    
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
(() => {

    interface movie {
        title:          string;
        description:    string;
        rating:         number;
        cast:           string[];
    }

    interface actor {
        fullName:   string, 
        birthdate:  Date
    }

    // función para obtener información de una película por Id
    function getMovieById( movieId: string ) {
        console.log({ movieId });
    }

    // función para obtener información de los actores de una película - Actors o Cast // id = movieId getMovieCast
    function getMovieCastById( id: string ) {
        console.log({ id });
    }

    // funcion para obtener el bio del actor por el id
    function getActorById( ActorId: string ) {
        console.log({ ActorId });
    }
    
    // Crear una película
    function createMovie({title, description, rating, cast} : movie) {
        console.log({ title, description, rating, cast });
    }

    // Crea un nuevo actor
    function createActor({fullName, birthdate}: actor ): boolean {
        
        // tarea asincrona para verificar nombre
        // ..
        // ..
        if ( fullName === 'fernando' ) return false;

        console.log('Crear actor');
        return true;        

    }

    


})();





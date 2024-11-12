(() => {
    function getMovieById( movieId: string ) {
        console.log({ movieId });
    }

    function getCastByMovieId( id: string ) {
        console.log({ id });
    }

    function getActorBiographById( id: string ) {
        console.log({ id });
    }
    
    interface movieInfo {
        title:          string;
        description:    string;
        rating:         number;
        cast:           string[];
    }

    function createMovie({title, description, rating, cast } :  movieInfo ) {
        console.log({ title, description, rating, cast });
    }

    function createActor( fullName: string, birthdate: Date ): boolean {
        
        if ( fullName === 'fernando' ) return false;
        
        console.log('Crear actor');
        return true;        
    }
    
    //Continuar
    const getPayAmount = ({ isDead = false, isSeparated = true, isRetired = false }):number => {

        
        if ( isDead ) 
            return 1500;
        
        if ( isSeparated ) 
            return 2500;

        return isRetired ? 3000 : 4000;
        
    }

})();
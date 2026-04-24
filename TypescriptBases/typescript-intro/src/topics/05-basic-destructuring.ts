interface AudioPlayer
{
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details:{
        author: "Ed Sheeran",
        year: 2015
    }
}

const { song: anotherSong } = audioPlayer;
const { author: autor01, year: year01 } = audioPlayer.details;

// console.log(`Song:`, anotherSong)
// console.log(`Song:`, autor01)
// console.log(`Song:`, year01)


const [ p1, p2, p3]: string[] = ['Goku', 'Vegeta', 'Trunks'];

console.log('Personaje 3:', p3 || 'Personaje no encontrado')


export {};
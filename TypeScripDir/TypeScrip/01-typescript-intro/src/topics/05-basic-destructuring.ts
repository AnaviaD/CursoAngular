
interface AudioPlayer   {
    audioVolume : number;
    songDuration: number;
    song        : string;
    details     :Details;
}

interface Details{
    author  :string;
    year    :number;
}

const audioPlayer: AudioPlayer ={
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Ed cheran",
        year: 2015
    }
}

const { song: anotherSong, songDuration} = audioPlayer;

console.log(anotherSong, songDuration);

const [, , trunks]: string[] = ['Goku', 'Vegeta', 'Trunks'];

console.log(trunks);


export{};
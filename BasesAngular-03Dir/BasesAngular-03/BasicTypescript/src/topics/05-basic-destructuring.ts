interface AudioPlayer{
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
    details: {
        author: "Ed Sheeran",
        year: 2015
    }
}

const { song:anotherSong,
    details: detailss
} = audioPlayer;

const {author, year } = detailss

console.log('Song:', audioPlayer.song);
console.log(anotherSong, author, year)


const dbz: string[] = ['Goku', 'Vegeta', 'Trunk'];

console.log(dbz[1])


export{};
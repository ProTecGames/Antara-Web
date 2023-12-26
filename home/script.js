// Add your JavaScript code here

let currentSongIndex = null;
let playlist = [];
let sound = null;

document.addEventListener('DOMContentLoaded', function () {
    // Fetch top tracks from Last.fm API when the page loads
    fetchTopTracks();
});

function fetchTopTracks() {
    const apiKey = '2d6c0463ec93f5a33a616054bfa1cfa2';
    const lastfmEndpoint = `http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=${apiKey}&format=json&limit=10`;

    fetch(lastfmEndpoint)
        .then(response => response.json())
        .then(data => {
            const tracks = data.tracks.track;

            if (tracks && tracks.length > 0) {
                // Populate the playlist with track details
                playlist = tracks.map(track => ({
                    name: track.name,
                    artist: track.artist.name,
                    url: track.url,
                }));

                // Set the initial current song index
                currentSongIndex = 0;

                // Populate the song list
                const songListElement = document.getElementById('songList');

                playlist.forEach((track, index) => {
                    const li = document.createElement('li');
                    li.textContent = `${track.name} by ${track.artist}`;
                    li.onclick = () => playSong(index);
                    songListElement.appendChild(li);
                });

                // Start playing the first song
                playSong(currentSongIndex);
            } else {
                console.error('No top tracks found.');
                alert('Error: No top tracks found.');
            }
        })
        .catch(error => {
            console.error('Error fetching top tracks from Last.fm:', error);
            alert('Error fetching top tracks. Please try again.');
        });
}

function playSong(index) {
    if (index >= 0 && index < playlist.length) {
        const { name, artist, url } = playlist[index];

        if (sound) {
            sound.unload();
        }

        sound = new Howl({
            src: [url],
            format: ['mp3'],
            onplay: function () {
                document.getElementById('currentSong').textContent = `Now Playing: ${name} by ${artist}`;
                document.getElementById('playPauseBtn').textContent = 'Pause';
            },
            onpause: function () {
                document.getElementById('playPauseBtn').textContent = 'Play';
            },
            onend: function () {
                document.getElementById('currentSong').textContent = 'Now Playing: ';
                document.getElementById('playPauseBtn').textContent = 'Play';

                // Play the next song when the current one ends
                playNext();
            }
        });

        currentSongIndex = index;
        sound.play();
    } else {
        console.error('Invalid index:', index);
        alert('Error: Invalid index. Please try again.');
    }
}

function togglePlayPause() {
    if (sound) {
        sound.playing() ? sound.pause() : sound.play();
    }
}

function playNext() {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    playSong(nextIndex);
}

function playPrevious() {
    const previousIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(previousIndex);
}

// script.js

document.addEventListener('DOMContentLoaded', () => {
    axios.get('https://ipinfo.io/json?token=7ccae9c8d8744e')
        .then(response => response.data)
        .then(data => {
            console.log('IPINFO API Response:', data);
            const userCountry = data.country;

            axios.get(`https://youtube-music-api3.p.rapidapi.com/top?country=${userCountry}`, {
                headers: {
                    'X-RapidAPI-Key': '54fb139661mshb7ee757010901c9p177c1ajsn4a5b60261d0d',
                    'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
                }
            })
            .then(response => {
                console.log('YouTube Music API Response:', response.data);
                const songList = document.getElementById('songList');

                if (response.data.results && Array.isArray(response.data.results)) {
                    response.data.results.slice(0, 10).forEach(song => {
                        const songItem = createSongItem(song);
                        songList.appendChild(songItem);
                    });
                } else {
                    console.error('Error: Unable to fetch song data');
                    alert('Error: Unable to fetch song data');
                }
            })
            .catch(error => {
                console.error('YouTube Music API Error:', error);
                alert(`Error: ${error.message}`);
            });
        })
        .catch(error => {
            console.error('IPINFO API Error:', error);
            alert(`Error: ${error.message}`);
        });

    function createSongItem(song) {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');

        const img = document.createElement('img');
        img.src = song.thumbnail;
        img.alt = song.title;

        const p = document.createElement('p');
        p.textContent = `${song.title} - ${song.author}`;

        songItem.appendChild(img);
        songItem.appendChild(p);

        return songItem;
    }
});

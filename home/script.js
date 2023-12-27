// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://ipinfo.io/json?token=7ccae9c8d8744e')
        .then(response => response.json())
        .then(data => {
            console.log('IPINFO API Response:', data); // Log the response for debugging
            const userCountry = data.country;
            fetch(`https://youtube-music-api3.p.rapidapi.com/top?country=${userCountry}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '54fb139661mshb7ee757d010901c9p177c1ajsn4a5b60261d0d',
                    'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('YouTube Music API Response:', data); // Log the response for debugging
                const songList = document.getElementById('songList');
                
                if (data.results && Array.isArray(data.results)) {
                    data.results.slice(0, 10).forEach(song => {
                        const songItem = createSongItem(song);
                        songList.appendChild(songItem);
                    });
                } else {
                    console.error('Error: Unable to fetch song data');
                    alert('Error: Unable to fetch song data');
                }
            })
            .catch(error => {
                console.error('YouTube Music API Error:', error); // Log the error for debugging
                const errorMessage = `Error: ${error.message}\n\nServer Headers:\n${getHeadersAsString(response.headers)}`;
                alert(errorMessage);
            });
        })
        .catch(error => {
            console.error('IPINFO API Error:', error); // Log the error for debugging
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

    function getHeadersAsString(headers) {
        let headersString = '';
        headers.forEach((value, name) => {
            headersString += `${name}: ${value}\n`;
        });
        return headersString;
    }
});

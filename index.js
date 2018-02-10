/**
 * Scuffed program
 */

const express = require('express');
const app = express();
const got = require('got');

const apiBase = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
const apiKey = '';


app.get('/', (req, res) => {
    const username = req.query.username;

    getLastSong(username)
    .then(song => {
        res.send(song);
    })
});

function getLastSong(username) {
    return got.get(`${apiBase}&user=${username}&api_key=${apiKey}&format=json`, {
        json: true
    })
    .then(result => {
        const tracks = result.body.recenttracks.track;
        const song = tracks[0];

        if (!song) {
            return Promise.reject(new Error('No song was found'));
        }
        
        return `${song.artist['#text']} - ${song.name}`;
    })
}

app.listen(6969, () => {
    console.log('Server machine is not 🅱️ roke.. and is also listening on http://localhost:6969');
});
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({origin: true});
const express = require('express');
const axios = require('axios');
const api = express();

api.use(cors);

api.get('/', async (req, res) => {
    await axios.get('https://api.mangadex.org/manga?includes[]=cover_art&limit=12')
    .then(data => {
        res.send(data.data);
    })
    .catch(error => {
        res.sendStatus(error);
    });
});

api.get('/detail/:id', async (req, res) => {
    await axios.get(`https://api.mangadex.org/manga/${req.params.id}?includes[]=cover_art`)
    .then(data => {
        res.send(data.data);
    })
    .catch(error => {
        res.sendStatus(error);
    });
});

exports.api = functions.https.onRequest(api);
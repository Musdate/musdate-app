const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({origin: true});
const axios = require('axios');

exports.corsEnabled = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        await axios.get('https://api.mangadex.org/manga?includes[]=cover_art&limit=12')
        .then(data => {
            res.send(data.data);
        })
        .catch(error => {
            res.sendStatus(error);
        });
    })
});
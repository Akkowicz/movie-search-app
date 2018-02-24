var express = require('express');
var app = express();
var request = require('request');

var omdbAPIKey = '42449aa7';

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/movies', (req, res) => {
    if (req.query.search) {
        var queryText = req.query.search;
    }
    else {
        var queryText = "Stranger Things";
    }
    request(`http://www.omdbapi.com/?apikey=${omdbAPIKey}&s=${queryText}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var apiData = JSON.parse(body);
            if (apiData.Response === "True") {
                res.render('results', { data: apiData });
            }
            else {
                console.log("Movie not found");
                var queryText = "Stranger Things";
                request(`http://www.omdbapi.com/?apikey=${omdbAPIKey}&s=${queryText}`, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        var apiData = JSON.parse(body);
                        res.render('results', { data: apiData });
                    }
                });
            }

        }
    });
});

app.get('/movies/details', (req, res) => {
    if (req.query.id) {
        var queryText = req.query.id;
    }
    else {
        var queryText = "tt0079470";
    }
    request(`http://www.omdbapi.com/?apikey=${omdbAPIKey}&i=${queryText}&plot=full`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var apiData = JSON.parse(body);
            res.render('details', { data: apiData });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Movie search app started!');
});

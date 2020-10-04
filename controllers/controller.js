var express = require('express');
var axios = require('axios');

const api_key = process.env.OPENWEATHERMAP_API_KEY;

const { body, validationResult } = require('express-validator');

exports.geo_location_weather_get = function(req, res) {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${api_key}`)
    .then(function (response) {
        const obj = response.data;
        res.render('index',
        {title: obj.name,
            description: obj.weather[0].description,
            lowTemp: obj.main.temp_min,
            highTemp: obj.main.temp_max});
    })
    .catch(function (error) {
        res.send(error);
    });
};

exports.user_input_location_weather_post = [
    // validate and sanitize request data
    // possible validators isLatLong() and isLocale()
    // possible sanitizers trim() and escape()
    body('location').not().isEmpty().trim().escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const location = req.body.location;
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`)
            .then(function (response) {
                const obj = response.data;
                res.render('index',
                {title: obj.name,
                    description: obj.weather[0].description,
                    lowTemp: obj.main.temp_min,
                    highTemp: obj.main.temp_max});
            })
            .catch(function (error) {
                res.send(error);
            });
        }
    }
];
var express = require('express');
var axios = require('axios');

const api_key = process.env.OPENWEATHERMAP_API_KEY;

exports.index = function(req, res) {
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
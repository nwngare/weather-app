var express = require('express');
var axios = require('axios');

exports.index = function(req, res) {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={your_api_key}')
    .then(function (response) {
        console.log(response.data);
        res.send(response.data);
    })
    .catch(function (error) {
        res.send(error);
    });
};
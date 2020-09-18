var express = require('express');
var axios = require('axios');

exports.index = function(req, res) {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={your_api_key}')
        .then(response => {
        console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    res.send('Requested current weather for London UK');
};
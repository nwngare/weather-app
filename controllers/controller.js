var express = require('express');
var axios = require('axios');

const api_key = process.env.OPENWEATHERMAP_API_KEY;

const { body, validationResult } = require('express-validator');

exports.geo_location_weather_get = function(req, res) {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=New+York,us&units=imperial&appid=${api_key}`)
    .then(function (response) {
        const obj = response.data;
        res.render('index',
        {name: obj.city.name,
            description: obj.list[0].weather[0].description,
            temp0: obj.list[0].main.temp,
            lowTemp0: obj.list[0].main.temp_min,
            highTemp0: obj.list[0].main.temp_max,
            temp1: obj.list[1].main.temp,
            lowTemp1: obj.list[1].main.temp_min,
            highTemp1: obj.list[1].main.temp_max,
            temp2: obj.list[2].main.temp,
            lowTemp2: obj.list[2].main.temp_min,
            highTemp2: obj.list[2].main.temp_max,
            temp3: obj.list[3].main.temp,
            lowTemp3: obj.list[3].main.temp_min,
            highTemp3: obj.list[3].main.temp_max,
            temp4: obj.list[4].main.temp,
            lowTemp4: obj.list[4].main.temp_min,
            highTemp4: obj.list[4].main.temp_max});
    })
    .catch(function (error) {
        res.send(error);
    });
};

exports.user_input_location_weather_post = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const location = req.body.location;
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${api_key}`)
        .then(function (response) {
            const obj = response.data;
            res.render('index',
            {name: obj.city.name,
                description: obj.list[0].weather[0].description,
                temp0: obj.list[0].main.temp,
                lowTemp0: obj.list[0].main.temp_min,
                highTemp0: obj.list[0].main.temp_max,
                temp1: obj.list[1].main.temp,
                lowTemp1: obj.list[1].main.temp_min,
                highTemp1: obj.list[1].main.temp_max,
                temp2: obj.list[2].main.temp,
                lowTemp2: obj.list[2].main.temp_min,
                highTemp2: obj.list[2].main.temp_max,
                temp3: obj.list[3].main.temp,
                lowTemp3: obj.list[3].main.temp_min,
                highTemp3: obj.list[3].main.temp_max,
                temp4: obj.list[4].main.temp,
                lowTemp4: obj.list[4].main.temp_min,
                highTemp4: obj.list[4].main.temp_max});
        })
        .catch(function (error) {
            res.send(error);
        });
    }
};

exports.geo_location_weather_post = function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const lat = req.body.latitude;
        const lon = req.body.longitude;
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${api_key}`)
        .then(function (response) {
            const obj = response.data;
            console.log(obj);
            res.send(obj)
        })
        .catch(function (error) {
            res.send(error);
        });
    }
};
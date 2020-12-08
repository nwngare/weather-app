var express = require('express');
var axios = require('axios');

const api_key = process.env.OPENWEATHERMAP_API_KEY;

const { body, validationResult } = require('express-validator');

exports.home_page_weather_get = function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        if(req.query.location && req.query.countries) {
            const locationArray = req.query.location.split(',').map(function(locationStr) { return locationStr.trim(); });
            if (locationArray.length == 2) {
                const city = locationArray[0];
                const state = locationArray[1];
                const country = req.query.countries
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=${api_key}`)
                .then(function (response) {
                    const obj = response.data;
                    res.render('index',
                    {name: obj.name,
                        icon: obj.weather[0].icon,
                        temp: Math.round(obj.main.temp),
                        humidity: obj.main.humidity,
                        windSpeed: obj.wind.speed,
                        cloudiness: obj.clouds.all,
                        sunrise: convertEpochTime(obj.sys.sunrise),
                        sunset: convertEpochTime(obj.sys.sunset)});
                })
                .catch(function (error) {
                    res.send(error);
                });
            } else if (locationArray.length == 1) {
                const city = locationArray[0];
                const country = req.body.countries
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${api_key}`)
                .then(function (response) {
                    const obj = response.data;
                    res.render('index',
                    {name: obj.name,
                        icon: obj.weather[0].icon,
                        temp: Math.round(obj.main.temp),
                        humidity: obj.main.humidity,
                        windSpeed: obj.wind.speed,
                        cloudiness: obj.clouds.all,
                        sunrise: convertEpochTime(obj.sys.sunrise),
                        sunset: convertEpochTime(obj.sys.sunset)});
                })
                .catch(function (error) {
                    res.send(error);
                });
            }
        } else {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=New+York,us&units=imperial&appid=${api_key}`)
            .then(function (response) {
                const obj = response.data;
                res.render('index',
                {name: obj.name,
                    icon: obj.weather[0].icon,
                    temp: Math.round(obj.main.temp),
                    humidity: obj.main.humidity,
                    windSpeed: obj.wind.speed,
                    cloudiness: obj.clouds.all,
                    sunrise: convertEpochTime(obj.sys.sunrise),
                    sunset: convertEpochTime(obj.sys.sunset)});
            })
            .catch(function (error) {
                res.send(error);
            });
        }
    }
};

exports.geo_location_weather_post = function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const lat = req.body.latitude;
        const lon = req.body.longitude;
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`)
        .then(function (response) {
            const obj = response.data;
            res.send(obj)
        })
        .catch(function (error) {
            res.send(error);
        });
    }
};

function convertEpochTime(timestamp) {
    var convertedTimestamp = new Date(timestamp * 1000);
    var hour = convertedTimestamp.getHours();
    var minute = convertedTimestamp.getMinutes();
    return hour + ":" + minute;
}
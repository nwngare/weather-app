var express = require('express');
var router = express.Router();
var axios = require('axios');

// Require controller modules
var controller = require('../controllers/controller');

/* GET weather. */
router.get('/', controller.geo_location_weather_get);
router.post('/', controller.user_input_location_weather_post);
module.exports = router;
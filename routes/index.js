var express = require('express');
var router = express.Router();

// Require controller modules
var controller = require('../controllers/controller');

/* GET weather. */
router.get('/', controller.home_page_weather_get);
router.post('/', controller.geo_location_weather_post);
module.exports = router;
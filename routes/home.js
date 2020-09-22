var express = require('express');
var router = express.Router();
var axios = require('axios');

// Require controller modules
var controller = require('../controllers/controller');

/* GET users listing. */
router.get('/', controller.index);

module.exports = router;
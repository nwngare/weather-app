var express = require('express');
var router = express.Router();

// Require controller modules
var controller = require('../controllers/controller');

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
var express = require('express');
var router = express.Router();
const orderController = require('./orderController')

router.get('/' , async function(req, res, next) {
    orderController.draw(res)
});

module.exports = router;


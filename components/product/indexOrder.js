var express = require('express');
var router = express.Router();
const orderController = require('./orderController')

router.use('/', express.static('public'));
router.get('/' , function(req, res, next) {
    orderController.viewListOrder(res)
});

router.get('/edit/:id',orderController.updateState)
module.exports = router;


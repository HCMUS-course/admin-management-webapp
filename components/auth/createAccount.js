var express = require('express');
var router = express.Router();
const a = require('./userModel');
const mongoose = require('mongoose');
const adminController=require('./adminController')
router.get('/', function(req, res, next) {  
  res.render('createAccount');
});
router.post('/',adminController.createAccount)

module.exports = router;
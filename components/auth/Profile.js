var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');
const adminController=require('./adminController')

router.use('/:id', express.static('public'))
router.get('/:id',adminController.viewProfile)
router.use('/edit/:id', express.static('public'))
router.post('/edit/:id',adminController.editProfile)
router.get('/edit/:id',adminController.viewEdit)
router.get('/delete/:id',adminController.deleteAdminAccount)
router.get('/lock/:id',adminController.lockAccount)
router.get('/unlock/:id',adminController.unlockAccount)
module.exports = router;
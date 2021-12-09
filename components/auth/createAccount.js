var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const a = require('./userModel');
const mongoose = require('mongoose');
const User = mongoose.model('user');
router.get('/', function(req, res, next) {
  
  res.render('createAccount');
});
router.post('/',(req,res)=>{
  
    createUser(req, res);
    
});

async function  createUser(req,res){
    const passworddHash = await bcrypt.hash(req.body.username,10);
    var newUser = new User();
      newUser.role = 0;
      newUser.isAuthenticated = true;
      newUser.isLock = false;
      newUser.username = req.body.username;
      newUser.password = passworddHash;
      newUser.fullname = req.body.fullname;
      newUser.email = req.body.email;
      newUser.phone = req.body.phoneNumber;
      newUser.address = req.body.address;
      
      newUser.save((err,doc)=>{
        if(!err)
        res.redirect('/admin/1');
        
        else{
          console.log('Error during record inserted: '+ err);
        }
  
      });
  }

module.exports = router;
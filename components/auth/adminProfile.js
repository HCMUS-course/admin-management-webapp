var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');



router.get('/:id',(req,res)=>{
  console.log("test2");
  

  User.findById(req.params.id,(err,doc)=>{
          
          res.render('adminProfile',{
          user : doc
          });
       
  });
});
module.exports = router;
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');



router.get('/:id',(req,res)=>{
  User.findById(req.params.id,(err,doc)=>{
         
          res.render('adminProfile',{
            viewTitle:"Profile", 
            user : doc,
            btnType : "hidden",
            stateEdit:""
          });
       
  });
});

router.post('/edit/:id',(req,res) =>{
  
  a = updateRecord(req, res);
  
  
});


function updateRecord(req, res) {
  User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
      if (!err) { 
        res.redirect("/Profile/" + req.body._id);
      }
      else {
        console.log('Error during record update : ' + err);
      }
  });
}
router.get('/edit/:id',(req,res)=>{
      
  User.findById(req.params.id,(err,doc)=>{
         
          res.render('adminProfile',{
            viewTitle:"Edit Profile",
            user : doc,
            btnType : "",
            stateEdit : "hidden"
          });
        
      
       
  });
});
router.get('/delete/:id',(req,res)=>{
      
  User.findByIdAndRemove(req.params.id,(err,doc)=>{
    
    if(!err)
        res.redirect('/admin/1');
    
    else{
      console.log('Error during record inserted: '+ err);
    }
  });
});

router.get('/lock/:id',(req,res)=>{
      
  User.findByIdAndUpdate(req.params.id,{isLock : true},(err,doc)=>{
    
    if(!err)
        res.redirect('/user/1');
    
    else{
      console.log('Error during record inserted: '+ err);
    }
  });
});

router.get('/unlock/:id',(req,res)=>{
      
  User.findByIdAndUpdate(req.params.id,{isLock : false},(err,doc)=>{
    
    if(!err)
        res.redirect('/user/1');
    
    else{
      console.log('Error during record inserted: '+ err);
    }
  });
});
module.exports = router;
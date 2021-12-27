var express = require('express');
const { route } = require('.');
var router = express.Router();
const multer = require('../config/multer')
const imageUpload = multer.fields([{name : 'image1' , maxCount : 1},{name : 'image2', maxCount : 1},{name : 'image3', maxCount : 1},{name : 'image4', maxCount : 1},{name : 'image5', maxCount : 1}])
const productController=require("./productController")
router.get('/' , function(req, res, next) {
  res.render('productAdd',{
      viewTitle:"Add Product"
  });
});
router.post('/',imageUpload,async (req,res) =>{
  productController.addProduct(req,res)
});

router.post('/editProduct/:id',imageUpload,async (req,res) =>{
  productController.editProduct(req,res)
});

router.get('/editProduct/:id',(req,res)=>{    
  productController.viewEdit(req,res)
});

router.get('/delete/:id', async (req,res)=>{
  productController.deleteProduct(req,res)
});
module.exports = router;

var express = require('express');
const { route } = require('.');
var router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('product');
const cloudinary = require('../config/cloudinary')
const multer = require('../config/multer')
const imageUpload = multer.fields([{name : 'image1' , maxCount : 1},{name : 'image2', maxCount : 1},{name : 'image3', maxCount : 1},{name : 'image4', maxCount : 1}])

router.get('/' , function(req, res, next) {
  console.log("test");
  res.render('productAdd',{
      viewTitle:"Add Product"
  });
  
});
router.post('/', imageUpload, async(req,res)=>{
  
  var pic1 = "";
  var pic2 = "";
  var pic3 = "";
  var pic4 = "";
  const fd = "product/" + req.body.type + "/" +req.body.name; 
  try{
    pic1 = await cloudinary.uploader.upload(req.files.image1[0].path,{folder : fd});
    pic2 = await cloudinary.uploader.upload(req.files.image2[0].path,{folder : fd});
    pic3 = await cloudinary.uploader.upload(req.files.image3[0].path,{folder : fd});
    pic4 = await cloudinary.uploader.upload(req.files.image4[0].path,{folder : fd});
    
  }
  catch(err){
    console.log(err);
  }


  var newProduct = new Product();
    newProduct.productType = req.body.type;
    newProduct.name = req.body.name;
    newProduct.brand = req.body.brand;
    newProduct.price = req.body.price;

    newProduct.isSale.status = false;
    newProduct.isSale.percent = req.body.percent;
    
    newProduct.stock = req.body.stock;
    newProduct.screenSize =req.body.screenSize;
    newProduct.color = req.body.color;
    newProduct.features = req.body.features;
    newProduct.description = req.body.description;
    newProduct.refreshRate = req.body.refreshRate;
    newProduct.description = req.body.description;
    newProduct.detail.itemDimensions = req.body.itemDimensions;
    newProduct.detail.itemWeight = req.body.itemWeight;
    newProduct.detail.modelName = req.body.modelName;
    newProduct.detail.os =req.body.os;
    newProduct.detail.processor = req.body.processor;
    newProduct.detail.graphicsCard = req.body.graphicsCard;
    newProduct.detail.ram = req.body.ram;
    newProduct.detail.storage = req.body.storage;
    newProduct.detail.webcam = req.body.webcam;
    newProduct.detail.battery = req.body.battery;
    newProduct.detail.powerAdapter = req.body.powerAdapter;
    newProduct.detail.manufacturer = req.body.manufacturer;
    newProduct.detail.releaseDate = req.body.releaseDate;

    newProduct.buyCount = 0;
    newProduct.viewCount = 0;

    newProduct.images.push(pic1.url);
    newProduct.images.push(pic2.url);
    newProduct.images.push(pic3.url);
    newProduct.images.push(pic4.url);

    newProduct.save((err,doc)=>{
      if(!err)
      res.redirect('/products/1');
      
      else{
        console.log('Error during record inserted: '+ err);
      }

    });
  
});

router.post('/editProduct/:id',imageUpload,async (req,res) =>{
  
    let product = await Product.findById(req.params.id);
    var pic1 = "";
    var pic2 = "";
    var pic3 = "";
    var pic4 = "";
    const fd = "product/" + product.productType + "/" +product.name;
    
    try{
      await cloudinary.api.delete_resources(all, {folder : fd});
    }catch(err){
        console.log(err);
    }
    
      
      console.log(fd);
      const fd2 = "product/" + req.body.type + "/" +req.body.name; 
      console.log(fd2);
      try{
      pic1 = await cloudinary.uploader.upload(req.files.image1[0].path,{folder : fd2});
      pic2 = await cloudinary.uploader.upload(req.files.image2[0].path,{folder : fd2});
      pic3 = await cloudinary.uploader.upload(req.files.image3[0].path,{folder : fd2});
      pic4 = await cloudinary.uploader.upload(req.files.image4[0].path,{folder : fd2});
      }
      catch(err){
        console.log(err);
      }
    
      
  
  Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    
    if (!err) { 
      res.redirect("/products/id/" + req.body._id);
    }
    else {
      console.log('Error during record update : ' + err);
    }
});
  
  
});


router.get('/editProduct/:id',(req,res)=>{
      
      Product.findById(req.params.id,(err,doc)=>{
              
              res.render('productAdd',{
                viewTitle:"Update Product",
                product : doc
              });
            
          
           
      });
});

router.get('/delete/:id',(req,res)=>{
      
  Product.findByIdAndRemove(req.params.id,(err,doc)=>{
    
    if(!err)
        res.redirect('/products/1');
    
    else{
      console.log('Error during record inserted: '+ err);
    }
  });
});
module.exports = router;

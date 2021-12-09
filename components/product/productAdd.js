var express = require('express');
const { route } = require('.');
var router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('product');

router.get('/' , function(req, res, next) {
  console.log("test");
  res.render('productAdd',{
      viewTitle:"Add Product"
  });
  
});
router.post('/',(req,res)=>{
  
  insertProduct(req, res);
  
});

router.post('/editProduct/:id',(req,res) =>{
  
  a = updateRecord(req, res);
  
  
});
function updateRecord(req, res) {
  Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
      if (!err) { 
        res.redirect("/products/id/" + req.body._id);
      }
      else {
        console.log('Error during record update : ' + err);
      }
  });
}
function insertProduct(req,res){
  
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

    newProduct.save((err,doc)=>{
      if(!err)
      res.redirect('/products/1');
      
      else{
        console.log('Error during record inserted: '+ err);
      }

    });
}



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

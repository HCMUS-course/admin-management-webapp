var express = require('express');
const { route } = require('.');
var router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('product');
const cloudinary = require('../config/cloudinary')
const multer = require('../config/multer')
const imageUpload = multer.fields([{name : 'image1' , maxCount : 1},{name : 'image2', maxCount : 1},{name : 'image3', maxCount : 1},{name : 'image4', maxCount : 1},{name : 'image5', maxCount : 1}])

router.get('/' , function(req, res, next) {
  
  res.render('productAdd',{
      viewTitle:"Add Product"
  });
  
});
router.post('/', imageUpload, async(req,res)=>{
  
  var pic1 = "";
  var pic2 = "";
  var pic3 = "";
  var pic4 = "";
  var pic5 = "";
  const fd = "product/" + req.body.type + "/" +req.body.name; 
  
  for (var i in req.files){
    if(req.files[i][0].fieldname == "image1"){
     
      pic1 = await cloudinary.uploader.upload(req.files.image1[0].path,{folder : fd,public_id: "p1"});
      
    }
    else if (req.files[i][0].fieldname == "image2"){
      
      pic2 = await cloudinary.uploader.upload(req.files.image2[0].path,{folder : fd,public_id: "p2"});
      
    }
    else if (req.files[i][0].fieldname == "image3"){
     
      pic3 = await cloudinary.uploader.upload(req.files.image3[0].path,{folder : fd,public_id: "p3"});
      
    }
    else if (req.files[i][0].fieldname == "image4")
    {
     
      pic4 = await cloudinary.uploader.upload(req.files.image4[0].path,{folder : fd,public_id: "p4"});
    
    }
    else if (req.files[i][0].fieldname == "image5")
    {
     
      pic5 = await cloudinary.uploader.upload(req.files.image5[0].path,{folder : fd,public_id: "p5"});
    
    }
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
    newProduct.images.push(pic5.url);

    newProduct.save((err,doc)=>{
      if(!err)
      res.redirect('/products/1');
      
      else{
        console.log('Error during record inserted: '+ err);
      }

    });
  
});

router.post('/editProduct/:id',imageUpload,async (req,res) =>{
  
  
  Product.findById(req.params.id,async (err,doc)=>{
    var pic1 = "";
    var pic2 = "";
    var pic3 = "";
    var pic4 = "";
    var pic5 = "";
    var a = b = c = d = e =0;
    const fd = "product/" + doc.productType + "/" +doc.name;
    const newfd = "product/" + req.body.type + "/" + req.body.name;
        
      
      for (var i in req.files){
        if(req.files[i][0].fieldname == "image1"){
          
          await cloudinary.api.delete_resources(fd+"/p1");
          
          pic1 = await cloudinary.uploader.upload(req.files.image1[0].path,{folder : fd,public_id: "p1"});
          pic1 = pic1.url;
          a = 1;
        }
        else if (req.files[i][0].fieldname == "image2"){
          
          await cloudinary.api.delete_resources(fd+"/p2");
         
          pic2 = await cloudinary.uploader.upload(req.files.image2[0].path,{folder : fd,public_id: "p2"});
          pic2 = pic2.url;
          b = 1;
        }
        else if (req.files[i][0].fieldname == "image3"){
          
          await cloudinary.api.delete_resources(fd+"/p3");
         
          pic3 = await cloudinary.uploader.upload(req.files.image3[0].path,{folder : fd,public_id: "p3"});
          pic3 = pic3.url;
          c = 1;
        }
        else if (req.files[i][0].fieldname == "image4")
        {
          
          await cloudinary.api.delete_resources(fd+"/p4");
         
          pic4 = await cloudinary.uploader.upload(req.files.image4[0].path,{folder : fd,public_id: "p4"});
          d = 1;
          pic4 = pic4.url;
        }
        else if (req.files[i][0].fieldname == "image5")
        {
          
          await cloudinary.api.delete_resources(fd+"/p5");
         
          pic5 = await cloudinary.uploader.upload(req.files.image5[0].path,{folder : fd,public_id: "p5"});
          e = 1;
          pic5 = pic5.url;
        }
      }
      if (a == 0){
        pic1 = doc.images[0];
      }
      if (b == 0){
        pic2 = doc.images[1];
      }
      if (c == 0){
        pic3 = doc.images[2];
      }
      if (d == 0){
        pic4 = doc.images[3];
      }
      if (e == 0){
        pic5 = doc.images[4];
      }
 
      if(newfd != fd){
        try{
          pic1 = await cloudinary.uploader.rename(fd+"/p1",newfd+"/p1");
          pic1 = pic1.url;
          }catch(err){
            console.log(err);
          }
          try{
            pic2 = await cloudinary.uploader.rename(fd+"/p2",newfd+"/p2");
            pic2 = pic2.url;
            }catch(err){
              console.log(err);
            }
            try{
             pic3 = await cloudinary.uploader.rename(fd+"/p3",newfd+"/p3");
             pic3 = pic3.url;
              }catch(err){
                console.log(err);
              }
              try{
              pic4 =  await cloudinary.uploader.rename(fd+"/p4",newfd+"/p4");
              pic4 = pic4.url;
                }catch(err){
                  console.log(err);
                }
                try{
                  pic5 =  await cloudinary.uploader.rename(fd+"/p5",newfd+"/p5");
                  pic5 = pic5.url;
                    }catch(err){
                      console.log(err);
                    }
        
          await cloudinary.api.delete_resources(fd+"/p1");
          
        
          await cloudinary.api.delete_resources(fd+"/p2");
         
        
          await cloudinary.api.delete_resources(fd+"/p3");
         
        
          await cloudinary.api.delete_resources(fd+"/p4");

          await cloudinary.api.delete_resources(fd+"/p5");
         
          await cloudinary.api.delete_folder(fd);  
                  
      }

    
          
    var pic=[];
    pic.push(pic1);
    pic.push(pic2);
    pic.push(pic3);
    pic.push(pic4);
    pic.push(pic5);
    const data = {
    productType : req.body.type,
    name : req.body.name,
    brand : req.body.brand,
    price : req.body.price,
    isSale : {
        status : req.body.status,
        percent : req.body.percent 
    },
    stock : req.body.stock,
    screenSize : req.body.screenSize,
    color : req.body.color,
    features : req.body.features,
    images : pic,
    description : req.body.description,
    detail : {
        itemDimensions : req.body.itemDimensions,
        itemWeight : req.body.itemWeight,
        modelName : req.body.modelName,
        processor : req.body.processor,
        graphicsCard : req.body.graphicsCard,
        os : req.body.os,
        ram : req.body.ram,
        storage : req.body.storage,
        webcam : req.body.webcam,
        battery : req.body.battery,
        powerAdapter : req.body.powerAdapter,
        manufacturer :req.body.manufacturer,
        releaseDate : req.body.releaseDate,
    },
 
    }
    Product.findOneAndUpdate({ _id: req.body._id }, data, { new: true }, (err, doc) => {
    
      if (!err) { 
        res.redirect("/products/id/" + req.body._id);
      }
      else {
        console.log('Error during record update : ' + err);
      }
  });
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

 router.get('/delete/:id', async (req,res)=>{
  Product.findById(req.params.id,async (err,doc)=>{
    const fd = "product/" + doc.productType + "/" +doc.name;
   
    
      
    await cloudinary.api.delete_resources(fd+"/p1");
       
       
    await cloudinary.api.delete_resources(fd+"/p2");
         
    
    await cloudinary.api.delete_resources(fd+"/p3");
            
    await cloudinary.api.delete_resources(fd+"/p4");

    await cloudinary.api.delete_resources(fd+"/p5");
             
    
    await cloudinary.api.delete_folder(fd);  
          
    
  });

  Product.findByIdAndRemove(req.params.id,(err,doc)=>{
    if(!err)
        res.redirect('/products/1');
    
    else{
      console.log('Error during record inserted: '+ err);
    }
  });
});
module.exports = router;

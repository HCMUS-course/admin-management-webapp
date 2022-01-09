const productServices=require('./productServices')
const {pagination}=require('../helper/pagination-helper')
const mongoose = require('mongoose');
const Product = mongoose.model('product');

const productPerPage = 4

exports.list=async function(req,res){
    const page = req.params.page
    let pageCount=0
    const products=await productServices.list(Number(page))
    const NumberOfProduct= await productServices.getNumberOfProduct()  
    pageCount=Math.ceil(NumberOfProduct/productPerPage)  ;
    const pageArray=pagination(Number(page),pageCount)
    res.render('productList',{products,pageArray:pageArray})
  }

  exports.listProductDetail=async function(req,res){
    var id = req.params.id
    const productDetail=await productServices.listProductDetail(id)
    res.render('productDetail',{productDetail})
  }

  module.exports.addProduct= async (req,res) =>{
    const check = await productServices.checkExist(req.body.name)
    if(!check){
  var pic1 = '';
  var pic2 = '';
  var pic3 = '';
  var pic4 = '';
  var pic5 = '';
  const fd = 'product/' + req.body.type + '/' +req.body.name; 
  
  for (var i in req.files){
    if(req.files[i][0].fieldname == 'image1'){
     
      pic1 = await productServices.uploadImage(fd,req.files.image1[0].path,'p1')
      
    }
    else if (req.files[i][0].fieldname == 'image2'){
      
      pic2 = await productServices.uploadImage(fd,req.files.image2[0].path,'p2')
      
    }
    else if (req.files[i][0].fieldname == 'image3'){
     
      pic3 = await productServices.uploadImage(fd,req.files.image3[0].path,'p3')
      
    }
    else if (req.files[i][0].fieldname == 'image4')
    {
     
      pic4 = await productServices.uploadImage(fd,req.files.image4[0].path,'p4')
    
    }
    else if (req.files[i][0].fieldname == 'image5')
    {
     
      pic5 = await productServices.uploadImage(fd,req.files.image5[0].path,'p5')
    
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
    
    
    newProduct.detail.itemWeight = req.body.itemWeight;
    newProduct.detail.modelName = req.body.modelName;
    newProduct.detail.os =req.body.os;
   
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
  }
  else{
    const rp = 'Product name already exists'
        res.render('productAdd',{
            viewTitle:"Add Product",
            check : rp
        })
  }
  }

  module.exports.editProduct = async (req,res) =>{
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
            
            await productServices.deleteImage(fd,"/p1")
            pic1 = await productServices.uploadImage(fd,req.files.image1[0].path,'p1')
            pic1 = pic1.url;
            a = 1;
          }
          else if (req.files[i][0].fieldname == "image2"){
            await productServices.deleteImage(fd,"/p2")
            pic2 = await productServices.uploadImage(fd,req.files.image2[0].path,'p2')
            pic2 = pic2.url;
            b = 1;
          }
          else if (req.files[i][0].fieldname == "image3"){
            
            await productServices.deleteImage(fd,"/p3")
            pic3 = await productServices.uploadImage(fd,req.files.image3[0].path,'p3')
            pic3 = pic3.url;
            c = 1;
          }
          else if (req.files[i][0].fieldname == "image4")
          {
            await productServices.deleteImage(fd,"/p4")
            pic4 = await productServices.uploadImage(fd,req.files.image4[0].path,'p4')
            d = 1;
            pic4 = pic4.url;
          }
          else if (req.files[i][0].fieldname == "image5")
          {
            await productServices.deleteImage(fd,"/p5")
            pic5 = await productServices.uploadImage(fd,req.files.image5[0].path,'p5')
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
            pic1 = await productServices.renameImage(fd+"/p1",newfd+"/p1")
            pic1 = pic1.url;
          }catch(err){
              console.log(err);
          }
          try{
            pic2 = await productServices.renameImage(fd+"/p2",newfd+"/p2")
            pic2 = pic2.url;
          }catch(err){
              console.log(err);
          }
          try{
            pic3 = await productServices.renameImage(fd+"/p3",newfd+"/p3")
            pic3 = pic3.url;
          }catch(err){
            console.log(err);
          }
          try{
            pic4 =  await productServices.renameImage(fd+"/p4",newfd+"/p4")
            pic4 = pic4.url;
          }catch(err){
            console.log(err);
          }
          try{
            pic5 =  await productServices.renameImage(fd+"/p5",newfd+"/p5")
            pic5 = pic5.url;
          }catch(err){
            console.log(err);
          }
          
          await productServices.deleteImage(fd,"/p1")            
          await productServices.deleteImage(fd,"/p2")           
          await productServices.deleteImage(fd,"/p3")          
          await productServices.deleteImage(fd,"/p4")  
          await productServices.deleteImage(fd,"/p5")  
          await productServices.deleteFolder(fd)
                    
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
          itemWeight : req.body.itemWeight,
          modelName : req.body.modelName,
          os : req.body.os,
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
      
      
    
}

module.exports.viewEdit =async (req,res) =>{
  const doc =await productServices.findById(req.params.id)      
    res.render('productAdd',{
      viewTitle:"Update Product",
      product : doc
    });
}

module.exports.deleteProduct = async (req,res) =>{
  const doc =await productServices.findById(req.params.id)   
  const fd = "product/" + doc.productType + "/" +doc.name;
  try{ 
  await productServices.deleteImage(fd,"/p1")            
  await productServices.deleteImage(fd,"/p2")           
  await productServices.deleteImage(fd,"/p3")          
  await productServices.deleteImage(fd,"/p4")  
  await productServices.deleteImage(fd,"/p5")  
  await productServices.deleteFolder(fd)
  }
  catch(err){
    console.log(err)
  }    
  await productServices.findByIdAndRemove(req.params.id)
  res.redirect('/products/1');
    
}
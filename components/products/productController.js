const productServies=require('./productServices')
const {ObjectId}=require('mongodb')
exports.list=async function(req,res){
    const products=await productServies.list()
    res.render('product/productList',{products})
  }

  exports.listProductDetail=async function(req,res){
    var id = req.params.id,
    path = req.params[0] ? req.params[0] : 'index.html';
    res.sendFile(path, {root: './public'});
    const productDetail=await productServies.listProductDetail(id)
    res.render('product/productDetail',{productDetail})

    
    
  }
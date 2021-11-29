const productServies=require('./productServices')
const {pagination}=require('../helper/pagination-helper')
const {ObjectId}=require('mongodb')

const productPerPage = 4


exports.list=async function(req,res){
    const page = req.params.page
    let pageCount=0
    const products=await productServies.list(Number(page))
    const NumberOfProduct= await productServies.getNumberOfProduct()  
    pageCount=NumberOfProduct/productPerPage;
    const pageArray=pagination(Number(page),pageCount)
    res.render('product/productList',{products,pageArray:pageArray})
  }

  exports.listProductDetail=async function(req,res){
    var id = req.params.id
    const productDetail=await productServies.listProductDetail(id)
    res.render('product/productDetail',{productDetail})

    
    
  }
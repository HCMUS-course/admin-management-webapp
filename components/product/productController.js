const productServices=require('./productServices')
const {pagination}=require('../helper/pagination-helper')
const {ObjectId}=require('mongodb')

const productPerPage = 4


exports.list=async function(req,res){
    const page = req.params.page
    let pageCount=0
    const products=await productServices.list(Number(page))
    const NumberOfProduct= await productServices.getNumberOfProduct()  
    pageCount=NumberOfProduct/productPerPage;
    const pageArray=pagination(Number(page),pageCount)
    res.render('productList',{products,pageArray:pageArray})
  }

  exports.listProductDetail=async function(req,res){
    var id = req.params.id
    const productDetail=await productServices.listProductDetail(id)
    res.render('productDetail',{productDetail})

    
    
  }
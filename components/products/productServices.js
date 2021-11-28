const Product=require('./productsModel')
const {ObjectId}=require('mongodb')

exports.list=()=>Product.find().lean()

exports.listProductDetail=(id)=>{
  
    return Product.findOne({_id:id}).lean();
}
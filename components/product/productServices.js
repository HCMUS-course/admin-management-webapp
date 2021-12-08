const Product=require('./productsModel')
const {ObjectId}=require('mongodb')

exports.list=(pageNum)=>{
    let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
    let page = pageNum || 1; 
  
     return Product
      .find()
      .skip((perPage * page) - perPage) 
      .limit(perPage)
      .lean()
      .exec()

}

exports.listProductDetail=(id)=>{
  
    return Product.findOne({_id:id}).lean();
}

exports.getNumberOfProduct=()=>{
  
   return Product.countDocuments();
   
}
exports.create =(req,res) =>{
        if(!reg.body){
            res.status(400).send({message:"Content can not be empty"});
            return;
        }
        
        newProduct
           .save(newProduct)
           .then(data=>{
               res.send(data)
           })
           .catch(err=>{
               res.status(500).send({
                   message:err.message|| "Error"
               });
           });
}
const Product=require('./productsModel')
const {ObjectId}=require('mongodb')
const cloudinary = require('../config/cloudinary')

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

module.exports.uploadImage = (fd,image,name) =>{
      return cloudinary.uploader.upload(image,{folder : fd,public_id: name})
}

module.exports.deleteImage = (fd,name) =>{
    return cloudinary.api.delete_resources(fd+name)
}

module.exports.renameImage = (oldName,newName) =>{
    return  cloudinary.uploader.rename(oldName,newName)
}
module.exports.deleteFolder = (fd) =>{
    return  cloudinary.api.delete_folder(fd)  
}
module.exports.findById = (id) =>{
    return Product.findById(id)
}
module.exports.findByIdAndRemove = (id) =>{
    return Product.findByIdAndRemove(id)
}
module.exports.checkExist = async (name) => {
    
    const user = await Product.findOne({name : name}).lean()
    if(user != null) {
        return true
    }
    else{
        return false
    }
}
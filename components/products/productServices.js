const Product=require('./productsModel')
const {ObjectId}=require('mongodb')

exports.list=(pageNum)=>{
    let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
    let page = pageNum || 1; 
  
     return Product
      .find()
     // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .lean()
      .exec()
    //   .then((products)=>{
    //          // FIRST CONSOLE.LOG
    //         console.log(employees);
    //         return products;
    //   })
    //   .catch((err)=>{
    //       return "Product query error"
    //   })

    // Product.find().lean()
}

exports.listProductDetail=(id)=>{
  
    return Product.findOne({_id:id}).lean();
}

exports.getNumberOfProduct=()=>{
  
   return Product.countDocuments();
   
}
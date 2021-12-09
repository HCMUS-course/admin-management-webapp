const User=require("./userModel")
var bcrypt = require('bcrypt');

module.exports.getAllUser=(pageNum,ItemPerPage)=>{
    ItemPerPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
    const page = pageNum || 1; 
  
     return User
      .find().where({role : 0})
      .skip((ItemPerPage * page) - ItemPerPage) 
      .limit(ItemPerPage)
      .lean()
      .exec()
      
}

 module.exports.countTotalOfUser=()=>{
    
    return User.countDocuments({role : 0});
}

module.exports.findByUsername=(username)=>{
    return User.findOne({username:username}).lean() 
}


module.exports.validPassword=async(password,user)=>{
    console.log(password);
    var a = await bcrypt.compare(password,user.password);
    return a
}

module.exports.findByID=(id)=>{
  
    return User.findOne({_id:id}).lean();
}
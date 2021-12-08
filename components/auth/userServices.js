const User=require("./userModel")
var bcrypt = require('bcrypt');

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
const User=require("./userModel")


module.exports.findByUsername=(username)=>{
    return User.findOne({username:username}).lean() 
}



module.exports.validPassword=(password,user)=>{
    return user.password=password
}
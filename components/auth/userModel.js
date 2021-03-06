const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
  
    role:Number,
    isAuthenticated:Boolean,
    isLock:Boolean,
    username:String,
    password:String,
    fullname : String,
    email:String,
    phone : String,
    address : String,
    verify_token:String,
})
module.exports=User = mongoose.model('user', UserSchema)
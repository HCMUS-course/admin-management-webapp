const {pagination}=require('../helper/pagination-helper')
const userService=require("./userServices")
var bcrypt = require('bcrypt');
const ItemPerPage=4


module.exports.listAdmin=async (req,res)=>{
    const page = Number(req.params.page)
    const users=await userService.getAllAdmin(page,ItemPerPage)
    const NumberOfUser= await userService.countTotalOfAdmin()  
    pageCount=Math.ceil(NumberOfUser/ItemPerPage)  ;
    const pageArray=pagination(page,pageCount)
    res.render('adminList',{users,pageArray:pageArray})
}

module.exports.viewProfile = async (req,res)=>{
    const doc = await userService.findByID(req.params.id)
     
        res.render('adminProfile',{
          viewTitle:"Profile", 
          user : doc,
          btnType : "hidden",
          stateEdit:""
        })
     
}
module.exports.viewEdit = async (req,res)=>{
    const doc = await userService.findByID(req.params.id)       
        res.render('adminProfile',{
          viewTitle:"Edit Profile",
          user : doc,
          btnType : "",
          stateEdit : "hidden"
        })
     
}
module.exports.editProfile = async (req,res) =>{
    await userService.findAndUpdate(req.body._id, req.body)    
    res.redirect("/profile/" + req.body._id);   
}

module.exports.deleteAdminAccount = async (req,res)=> {  
    await userService.findAndRemove(req.params.id,req.user._id)
    res.redirect('/admin/1')
}
module.exports.lockAccount = async (req,res) =>{
    await userService.findbyIDAndUpdateStatus(req.params.id,true)
    res.redirect('/user/1');
}
module.exports.unlockAccount = async (req,res) =>{
    await userService.findbyIDAndUpdateStatus(req.params.id,false)
    res.redirect('/user/1');
}
module.exports.createAccount = async(req,res)=>{
    const temp  = await userService.checkExist(req.body.username)
   
    if(!temp) {
    const passworddHash = await bcrypt.hash(req.body.password,10);
    const newUser = new User();
      newUser.role = 0;
      newUser.isLock = false;
      newUser.username = req.body.username;
      newUser.password = passworddHash;
      newUser.fullname = req.body.fullname;
      newUser.email = req.body.email;
      newUser.phone = req.body.phoneNumber;
      newUser.address = req.body.address;
      newUser.save((err,doc)=>{
        if(!err)
        res.redirect('/admin/1');
        
        else{
          console.log('Error during record inserted: '+ err);
        }
  
      });

    }
    else{ 
        const rp = 'Username already exists'
        res.render('createAccount',{
            check : rp
        })
    }

}

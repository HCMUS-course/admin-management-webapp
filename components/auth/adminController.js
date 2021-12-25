const {pagination}=require('../helper/pagination-helper')
const userService=require("./userServices")
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
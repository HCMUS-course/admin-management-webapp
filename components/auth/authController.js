const {pagination}=require('../helper/pagination-helper')
const userService=require("./userServices")
const ItemPerPage=4
exports.login=(req,res)=>{

    const isFailedLogin=req.query['failed-authentication']!==undefined
    res.render('login', {layout: false,isFailedLogin});
}

exports.logout=(req,res)=>{

    req.logout();
    res.redirect('/');
}


exports.list=async (req,res)=>{
    const page = Number(req.params.page)
    const users=await userService.getAllUser(page,ItemPerPage)
    const NumberOfUser= await userService.countTotalOfUser()  
    pageCount=Math.ceil(NumberOfUser/ItemPerPage)  
    const pageArray=pagination(page,pageCount)
    res.render('adminList',{users,pageArray:pageArray})
}






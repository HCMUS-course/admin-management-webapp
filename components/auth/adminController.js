const {pagination}=require('../helper/pagination-helper')
const userService=require("./userServices")
const ItemPerPage=4

module.exports.listAdmin=async (req,res)=>{
    const page = Number(req.params.page)
    const users=await userService.getAllUser(page,ItemPerPage)
    const NumberOfUser= await userService.countTotalOfUser()  
    pageCount=Math.ceil(NumberOfUser/ItemPerPage)  ;
    const pageArray=pagination(page,pageCount)
    res.render('adminList',{users,pageArray:pageArray})
}
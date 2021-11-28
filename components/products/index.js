const express=require('express')
const router=express.Router()
const productController=require("./productController")

router.get("/",productController.list)
router.get("/:id/*",productController.listProductDetail)

module.exports=router

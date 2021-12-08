const express=require('express')
const router=express.Router()
const productController=require("./productController")

router.use('/:route', express.static('public'));
router.get("/:page",productController.list)


router.use('/id/:route', express.static('public'));
router.get("/id/:id",productController.listProductDetail)


module.exports=router

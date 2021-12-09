const express=require('express')
const router=express.Router()

const userController = require("./userController")



router.use('/:route', express.static('public'));
router.get("/:page",userController.listUser)

module.exports=router
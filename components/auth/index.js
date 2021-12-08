const express=require('express')
const router=express.Router()
const passport=require('../../passport/index')
const authController=require("./authController")
const adminController=require("./adminController")


router.get('/login',authController.login)
router.get('/logout',authController.logout)

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/login?failed-authentication',
                                    })
);

router.use('/:route', express.static('public'));
router.get("/:page",adminController.listAdmin)


module.exports=router
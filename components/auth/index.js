const express=require('express')
const router=express.Router()
const passport=require('../../passport/index')
const authController=require("./authController")


router.get('/login',authController.login)
router.get('/logout',authController.logout)

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/login?failed-authentication',
                                    })
);
router
module.exports=router
const express=require('express')
const router=express.Router()
const productController=require("./productController")

router.get("/",productController.list)

// router.get('/id/:uid', function(req, res){
//     var uid = req.params.uid,
//         path = req.params[0] ? req.params[0] : 'index.html';
//     res.sendFile(path, {root: './public'});
// });
router.use('/id/:route', express.static('public'));
router.get("/id/:id",productController.listProductDetail)

// app.get('*', function(request, response){
//     response.send('Invalid URL');
// });

module.exports=router

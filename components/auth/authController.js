const userService=require("./userServices")

exports.login=(req,res)=>{

    const isFailedLogin=req.query['failed-authentication']!==undefined
    res.render('login', {layout: false,isFailedLogin});
}

exports.logout=(req,res)=>{

    req.logout();
    res.redirect('/');
}


const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const userService=require('../components/auth/userServices')

passport.use(new LocalStrategy(
  async function(username, password, done) {

    // User.findOne({ username: username }, function (err, user) 
    const user=await userService.findByUsername(username)
      // if (err) { return done(err); }
      console.log(user.isLock)
      if (!user || user.role == 1 || user.isLock == true ) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      const isValidAuth=await userService.validPassword(password,user)
      if (!isValidAuth) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    
  }
));
passport.serializeUser(function(user, done) {
    done(null, {username:user.username,role:user.role,email:user.email, _id : user._id});
  });
  
  passport.deserializeUser(async function(user, done) {
    // const user= await userService.findByUsername(username);
    done(null, user);
    });
  ;
module.exports=passport
var passport = require('passport');
 LocalStrategy = require('passport-local').Strategy;
passport.use( new LocalStrategy (function(username,password,done)
{
var query = {username:username, password:password};
User.findOne({username:username},function(err,user)
{   if (err) throw err;

  if(!user)
	{
		console.log('wrong username');

    return done(null,false,{message:'unknown user'});


	}
	else
	{
		User.findOne(query,function(err,pass){

			if(!pass)
			{ console.log('wrong password');

            return done(null,false,{message:'invalid password'});
			}
			else
			{
			    	return done(null,pass);
			    }

			})


			}

		})
	}))

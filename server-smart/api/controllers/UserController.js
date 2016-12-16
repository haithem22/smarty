/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport=require('passport');


module.exports = {
	//acceuil
	service:function (req,res){
		console.log("akram");
		res.send([{"id":"13","name":"houss"},{"id":"13","name":"houss"},{"id":"13","name":"houss"},{"id":"13","name":"houss"},{"id":"13","name":"houss"},
		{"id":"13","name":"houss"},{"id":"13","name":"houss"}])
	},
	acceuil:function (req,res) {
		console.log('this is acceuil');
		var job = req.body.job;
		var sector = req.body.sector;
		var name = req.body.name;
		console.log('job:');
		console.log(job);
		console.log('sector:');
		console.log(sector);
		console.log('name:');
		console.log(name);
		// if(job == '' || job == 'Select Job'){
		if(job == undefined){

			User.find({'professionalboolean': true, 'firstName': name}, function (err, users) {
				if(users){
					console.log('this is first if statement job undefined');

					if(users.length == 0){
						User.find({'professionalboolean': true, 'lastName': name}, function (err, users) {
							if(users){
								console.log('this is first if statement last name search');

								if(users.length == 0){
									console.log('users empty!! ');
									var erreur = 'Professional not found';
									console.log(erreur);
									return res.send({'err':erreur, 'errorb': false,'usersList':['']});
								}else {

									console.log(users);
									return res.send({'usersList':users, 'errorb': true, 'err':''});
								}
							}
							else if (err){
								console.log(err);
								return res.send({'err':err, 'errorb': false,'usersList':['']});
							}
							// else {
							// 	err = 'Professional not found';
							// 	console.log(err);
							// 	return res.send({'err':err});
							// }



						});
						// console.log('users empty!! ');
						// var erreur = 'Professional not found';
						// console.log(erreur);
						// return res.send({'err':erreur, 'errorb': false,'usersList':['']});
					}
					else {

						console.log(users);
						return res.send({'usersList':users, 'errorb': true, 'err':''});
					}
				}
				else if (err){
					console.log(err);
					return res.send({'err':err, 'errorb': false,'usersList':['']});
				}
				// else {
				// 	err = 'Professional not found';
				// 	console.log(err);
				// 	return res.send({'err':err});
				// }



			})
		}
		else if(sector == 'Select Sector') {
			User.find({'professionalboolean': true, 'firstName': name, 'job': job}, function (err, users) {
				if(users){
					console.log('this is first if statement sector undefined');

					if(users.length == 0){
						console.log('users empty!! ');
						var erreur = 'Professional not found';
						console.log(erreur);
						return res.send({'err':erreur, 'errorb': false,'usersList':['']});
					}
					console.log(users);
					return res.send({'usersList':users, 'errorb': true, 'err':''});
				}
				else if (err){
					console.log(err);
					return res.send({'err':err, 'errorb': false,'usersList':['']});
				}
				// else {
				// 	err = 'Professional not found';
				// 	console.log(err);
				// 	return res.send({'err':err});
				// }



			})
		}
		else {
			User.find({'professionalboolean': true, 'firstName': name, 'job': job, 'sector': sector}, function (err, users) {
				if(users){
					console.log('this is first if statement all is defined !');

					if(users.length == 0){
						console.log('users empty!! ');
						var erreur = 'Professional not found';
						console.log(erreur);
						return res.send({'err':erreur, 'errorb': false,'usersList':['']});
					}
					console.log(users);
					return res.send({'usersList':users, 'errorb': true, 'err':''});
				}
				else if (err){
					console.log(err);
					return res.send({'err':err, 'errorb': false,'usersList':['']});
				}
				// else {
				// 	err = 'Professional not found';
				// 	console.log(err);
				// 	return res.send({'err':err});
				// }



			})
		}



		// // User.find({'job':job ,'sector':sector, 'professionalboolean': true, },function (err,users) {
		// 		User.find({},function (err,users) {
		// 	if(users){
		// 		console.log('this is first if statement');
		//
		// 		if(users.length == 0){
		// 			console.log('users empty!! ');
		// 			var erreur = 'Professional not found';
		// 			console.log(erreur);
		// 			return res.send({'err':erreur, 'errorb': false,'usersList':['']});
		// 		}
		// 		console.log(users);
		// 		return res.send({'usersList':users, 'errorb': true, 'err':''});
		// 	}
		// 	else if (err){
		// 		console.log(err);
		// 		return res.send({'err':err, 'errorb': false,'usersList':['']});
		// 	}
		// 	// else {
		// 	// 	err = 'Professional not found';
		// 	// 	console.log(err);
		// 	// 	return res.send({'err':err});
		// 	// }
		//
		//
		//
		// })
		// // return res.send({"next":false});

	},

	//sign up
	signup:function(req,res)
	{
		var daysOfWeek = ['Monday', 'Tuesday' , 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	//verification repnse entre react et sails
	console.log('this is ajout');
	var email=req.body.email;
	var username=req.body.username;
	var password=req.body.password;
	//recherche si username se répète
	User.findOne({"username":username},function(err, user){
	if (user){
		if (user.email == email){
					req.checkBody('username','username already exists').equals(!user.username);
					req.checkBody('email','email already exists').equals(!user.email);
		}
		else{
					req.checkBody('username','username already exists ').equals(!user.username);
		}

		console.log("invalid username");

		req.checkBody('email','Invalid email adress').isEmail();

		req.checkBody('username','username field is required').notEmpty();

		req.checkBody('password','password field is required').notEmpty();

		var errors = req.validationErrors();

		console.log(errors);

		return res.send({"next":false,"errors":errors})
	}
		else {
			// recherche si l email se répéte
						   User.findOne({"email":email},function(err, user){
							 if(user)
							 {
												req.checkBody('email','email already exists ').equals(!user.email);

												console.log('email failed');

												req.checkBody('email','Invalid email adress').isEmail();

												req.checkBody('username','username field is required').notEmpty();

												req.checkBody('password','password field is required').notEmpty();

												var errors = req.validationErrors();
												console.log(errors);

												return res.send({"next":false,"errors":errors})
							}
							else
							{

									console.log("iam here");
									console.log(req.body.username);
									User.create(  {firstName: req.body.firstName,
									              lastName: req.body.lastName,
									              telephone: req.body.telephone,
									              job:req.body.job,
									              sector: req.body.sector,
									              username: req.body.username,
									              email: req.body.email,
									              password: req.body.password,
									              professionalboolean: req.body.professionalboolean,
									              adress: 'adress',
									              longitude: req.body.longitude,
									              latitude: req.body.latitude,
															  token:req.session.token},function(err,user){

										if(err)
										{
													console.log(err);
													return res.send({"next":false});
										}


										console.log(user);
										if(user.professionalboolean){
											Configuration.create(
												{
													idProfessional:user.id,
													duration: 0.5,
													devices: ['']
												},
												function (err, config) {
													if(err){
														console.log(err);
														return res.send({"next":false});
													}
													else{
														console.log(config);
													}
												}
											);
											daysOfWeek.map( (day) => {
												Agenda.create(
													{
														idProfessional:user.id,
														day:day,
														timeOpeningAm: 8,
														timeClosingAm: 12,
														timeOpeningPm: 14,
														timeClosingPm: 18
													},
													function (err, agenda) {
														if(err){
															console.log(err);
															return res.send({"next":false});
														}

														else{
															console.log(agenda);
														}
													}
												);
											});
										}
										return res.send({"next":true, user: user});

				        	})

							}


					})
		}


})
},
//singn in
signin: function(req,res){
	console.log('signin');
	passport.authenticate('local',function(err,user,info){
		if(err){
			return res.send({next:false, error: 'Problem Occured!'})
		}
		else if(!user){
			return res.send({next:false, error: 'Username/Password does not match!'})
		}

	req.session.authenticated = true;
  var token =req.session.token;
	req.session.user=user;
	if(user.token==undefined || user.token!=token){
		  User.update({id:user.id},{token:token},function(err,user){
			console.log(user);
			})
		}


  res.send({next:true, user: user});

})(req,res);



},




};

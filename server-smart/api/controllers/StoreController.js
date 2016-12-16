/**
 * StoreController
 *
 * @description :: Server-side logic for managing stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	registertoken:function(req,res)
	{console.log("haithem");
		var token = req.body.token;
		req.session.token = token;
		res.send({"haith":"ok"});
	},
	register:function(req,res){
		req.session.idProfessional= req.body.idProfessional;

		console.log(req.session.idProfessional);

		res.send(req.session.idProfessional);
	},
	load:function(req,res){

		res.send(req.session.idProfessional);
	}
};

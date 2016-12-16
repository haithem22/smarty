/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	jobi:function(req,res)
	{
		res.send({"id": 12345,
    "name": "string",
    "weight": 1,
    "height": 4,
"profession?": "string"})
	},
	job:function(req,res){


//
//
// var a = 	{
// 		jobName: 'Medecin',
// 		sectors: ['Dentiste','Generaliste','cardiologue', 'Radiologue', 'Opticien']
// 	};
// 	var b ={
// 		jobName: 'avocat',
// 		sectors: ['financier', 'droit del homme']
// 	};
// 	var c = {
// 		jobName: 'Architecte',
// 		sectors: ['dsjfd', 'fsdhfkdshf']
// 	}
// 		Job.create(a,function (err,model) {
// 				if(model){
//
// 					console.log(a);
// 					console.log(a.sectors[0]);
// 				}else{
// 					console.log(err);
// 				}
//
// 			}
// 		);
// 		Job.create(b,function (err,model) {
// 				if(model){
//
// 					console.log(b);
// 					console.log(b.sectors[0]);
// 				}else{
// 					console.log(err);
// 				}
//
// 			}
// 		);	Job.create(c,function (err,model) {
// 					if(model){
//
// 						console.log(c);
// 						console.log(c.sectors[0]);
// 					}else{
// 						console.log(err);
// 					}
//
// 				}
// 			);

		Job.find({},function(err,job){
					 console.log(job);
					 res.send({"job":job});

		})
	}
};

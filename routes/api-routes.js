var db = require("../models");

module.exports = function(app) {
	app.get("/api/socks/:OwnerId?",function(req,res){
		var query = {
		 	include: [{
		 		model: db.Owner,
		 		attributes: ["profile_img", "user_name"]

		 	}]
		 };

		 if(req.params.OwnerId) {
		 	query.where = {
		 		OwnerId: req.params.OwnerId
		 	}
		 }

		 db.Sock.findAll(query)
		.then(function(dbPost) {
		  res.json(dbPost)
		});

	});

};
var db = require("../models");

module.exports = function(app) {
	app.get("/api/all-socks",function(req,res){
		console.log(db.Socks);
		 db.Sock.findAll({
		 	include: [{
		 		model: db.Owner,
		 		attributes: ["profile_img", "user_name"]

		 	}]

		 })
		.then(function(dbPost) {
		  res.json(dbPost)
		});

	});

};
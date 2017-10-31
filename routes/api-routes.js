var db = require("../models");

module.exports = function(app) {
	app.get("/api/all-socks",function(req,res){
		 db.Sock.findAll({})
		.then(function(dbPost) {
		  res.json(dbPost)
		});

	})
	app.post("/api/new-sock", function(req,res){
		//add new sock item

	})

};

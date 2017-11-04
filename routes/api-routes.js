var db = require("../models");

module.exports = function(app) {
	app.get("/api/all-socks",function(req,res){
		console.log(db.Socks);
		 db.Sock.findAll({})
		.then(function(dbPost) {
		  res.json(dbPost)
		});

	});

	// app.get("api/users/:username", function(req, res) {

	// })

	// app.post("/api/socks", function(req,res){
	// 	db.Sock.create({
 //      		item_name: req.body.item_name,
 //      		description: req.body.description
 //    	}).then(function(dbPost) {
 //      // We have access to the new todo as an argument inside of the callback function
 //      		res.json(dbPost);
 //    	});

	// });

};

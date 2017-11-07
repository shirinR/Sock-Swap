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

	app.get("/api/user/:id", function(req,res) {
		db.Owner.findAll({
			where: {
				id: req.params.id
			}
		}).then(function(dbUser){
			res.json(dbUser)
		});
	});

	app.get("/api/owners", function(req,res){
      	db.Owner.findAll({ }).then(function(dbPost){
          	res.json(dbPost);
      	});
  	});

	app.get("/api/trade-request/all/:ownerId?",function(req,res){
		var query = {}
		if(req.params.ownerId) {
		 	query.where = {
		 		ownerId: req.params.ownerId
		 	}
		}
		 	db.TradeRequest.findAll(query)
			.then(function(dbPost) {
		  	res.json(dbPost)
		});
	});
	app.post("/api/trade-request/create",function(req,res){
			console.log("body",req.body)

		 	db.TradeRequest.create({
		 		ownerId: req.body.ownerId,
		 		requesteeId: req.body.requesteeId,
		 		ownerSockId: req.body.ownerSockId,
		 		requesteeSockId: req.body.requesteeSockId

		 	})
			.then(function(dbPost) {
			  	res.json(dbPost)
			});
	});
};
